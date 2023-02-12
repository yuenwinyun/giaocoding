import { Shape } from './Shape.interface';

export class AreaCalculator {
	sum<T extends Shape>(shapes: T[]): number {
		// return 0;
		let sum = 0;
		for (const shape of shapes) {
			// violate the second principle 2️⃣
			// if (shape instanceof A) {
			// }

			// if (shape instanceof B) {
			// }
			sum += shape.sum();
		}

		return sum;
	}

	// These methods violate 1️⃣SRP  -> one responsibility only, no more methods except sum()
	// json(): string {}
	// csv(): string {}
}
