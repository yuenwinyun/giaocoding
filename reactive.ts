type Effect = ((...args: unknown[]) => unknown) & {
	deps: Set<(...args: unknown[]) => unknown>[];
	options: EffectOptions;
};
let activeEffect: Effect;

type EffectBucket = WeakMap<object, Map<string | symbol, Set<Effect>>>;
const effectBucket: EffectBucket = new WeakMap();

const effectStack: Effect[] = [];
const taskQueue = new Set<Function>();
const p = Promise.resolve();
let isFlushing = false;

// remove redundant effect by pushing to an Set
function flushJob() {
	if (isFlushing) return;
	isFlushing = true;
	p.then(() => {
		taskQueue.forEach((task) => task());
	}).finally(() => {
		isFlushing = false;
	});
}

type EffectOptions = {
	scheduler?: (cb: (...args: unknown[]) => unknown) => unknown;
	lazy?: boolean;
};
// some built-in vue effect to update VNode reactively
function useEffect(cb: (...args: unknown[]) => unknown, options: EffectOptions = {}) {
	const effectFn: Effect = () => {
		activeEffect = effectFn;
		effectStack.push(effectFn);
		// #5 before executing effects, remove unused effects
		cleanup(effectFn); // delete all deps before executing side effect
		const res = cb();
		effectStack.pop();
		activeEffect = effectStack[effectStack.length - 1];
		return res;
	};

	// to remove unused effects
	const cleanup = (effectFn: Effect) => {
		for (const deps of effectFn.deps) {
			deps.delete(effectFn);
		}
		effectFn.deps.length = 0;
	};

	effectFn.options = options;
	// store deps of effect for removing unused effects in cleanup step
	effectFn.deps = [];

	// #2 run effect first to track all deps
	if (effectFn.options?.lazy) {
		return effectFn;
	}

	effectFn();
}

function track(target: object, key: string | symbol) {
	if (!activeEffect) return;
	let depsMap = effectBucket.get(target);
	if (!depsMap) {
		effectBucket.set(target, (depsMap = new Map()));
	}
	let deps = depsMap.get(key);
	if (!deps) {
		depsMap.set(key, (deps = new Set()));
	}

	deps.add(activeEffect);
	activeEffect.deps.push(deps);
}
function execute(target: object, key: string | symbol) {
	const deps = effectBucket.get(target);
	if (!deps) return;

	const effects = deps.get(key);
	const effectsToRun = new Set<Effect>(effects);
	effectsToRun.forEach((effect) => {
		if (effect === activeEffect) return;
		if (effect.options?.scheduler) {
			effect.options.scheduler(effect);
		} else {
			effect();
		}
	});
}

// #1 making object reactive such that it can be used in reactive system
function defineReactive<T extends object>(obj: T) {
	return new Proxy(obj, {
		get(target, p) {
			// #3 when object property has been accessed, add activeEffect(if exists) to its deps
			track(target, p);
			return target[p];
		},
		set(target, p, value) {
			target[p] = value;
			// #4 when object property has been mutated, execute all side effects in its deps
			execute(target, p);
			return true;
		},
	});
}

let runTrace = "";
const context = { name: "context" };
const reactiveDataForTestingBranching = defineReactive({ foo: "foo", bar: "bar", ok: true });
useEffect(() => {
	context.name = reactiveDataForTestingBranching.ok
		? reactiveDataForTestingBranching.foo
		: reactiveDataForTestingBranching.bar;
});
context;
reactiveDataForTestingBranching.ok = false;
reactiveDataForTestingBranching.foo = "foo updated";
context;

const reactiveDataForTestingSelfIncrement = defineReactive({ count: 1 });

useEffect(() => {
	reactiveDataForTestingSelfIncrement.count++;
});
reactiveDataForTestingSelfIncrement;
reactiveDataForTestingSelfIncrement.count = 1;
reactiveDataForTestingSelfIncrement;

runTrace = "";
const testScheduler = defineReactive({ count: 1 });
useEffect(
	() => {
		runTrace += `${testScheduler.count};\n`;
	},
	{
		scheduler: (effect: any) => {
			taskQueue.add(effect);
			flushJob();
		},
	}
);
runTrace += "ended;\n";
testScheduler.count++;
testScheduler.count++;
runTrace;
p.then(() => {
	runTrace;
});

function computed<T extends {}>(getter: () => T) {
	let value: T;
	let dirty = true;

	const obj = {
		get value() {
			if (dirty) {
				console.log("called");
				value = effect() as T;
				dirty = false;
			}
			track(obj, "value");
			return value;
		},
	};

	const effect = useEffect(getter, {
		lazy: true,
		scheduler: (cb) => {
			cb();
			if (!dirty) {
				dirty = true;
				execute(obj, "value");
			}
		},
	});

	return obj;
}

runTrace = "";
const testComputed = defineReactive({ data: 1 });
const computedData = computed(() => testComputed.data + 2);
console.log(computedData.value);
const effectFn = useEffect(
	() => {
		runTrace += `${testComputed.data};\n`;
		return "YES";
	},
	{ lazy: true }
);

useEffect(() => {
	console.log(computedData.value);
});
testComputed.data++;
console.log(effectFn && effectFn());
runTrace;
console.log(computedData.value);
console.log(computedData.value);

function watch(
	source: unknown,
	cb: (oldValue: unknown, newValue: unknown, onInvalidate: Function) => unknown,
	options: { immediate: boolean; flush: "pre" | "post" | "sync" } = { immediate: false, flush: "sync" }
) {
	let getter;
	if (typeof source === "function") {
		getter = source;
	} else {
		getter = () => traverse(source);
	}

	let cleanup;
	function onInvalidate(cb: (...args: unknown[]) => unknown) {
		cleanup = cb;
	}

	let oldValue, newValue;
	const job = () => {
		if (cleanup) {
			cleanup();
		}

		newValue = effectFn();
		cb(oldValue, newValue, onInvalidate);
		oldValue = newValue;
	};
	const effectFn = useEffect(() => getter(), {
		scheduler: () => {
			if (options.flush === "post") {
				p.then(job);
			} else {
				job();
			}
		},
		lazy: true,
	});
	if (options.immediate) {
		job();
	} else {
		oldValue = effectFn();
	}
}
function traverse(value: unknown, seen = new Set()) {
	if (typeof value !== "object" || value === null || seen.has(value)) {
		return;
	}
	seen.add(value);
	for (const k in value) {
		traverse(value[k], seen);
	}
	return value;
}

export {};
