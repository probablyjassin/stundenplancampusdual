export function useArrayEquals() {
	function arraysEqual(a: any[], b: any[]) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length !== b.length) return false;

		for (var i = 0; i < a.length; ++i) {
			if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) return false;
		}
		return true;
	}
	return {
		arraysEqual,
	};
}
