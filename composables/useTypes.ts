export interface CampusData {
	title: string;
	start: number;
	end: number;
	allDay: boolean;
	description: string;
	color: string;
	editable: boolean;
	room: string;
	sroom: string;
	instructor: string;
	sinstructor: string;
	remarks: string;
}

export interface CampusDataSimple {
	title: string;
	start: string;
	end: string;
	timestamp: number;
	description: string;
	instructor: string;
	room: string;
}

export interface Meal {
	id: number;
	name: string;
	category: string;
	prices: {
		students: number;
		employees: number;
		pupils: number | null;
		others: number;
	};
	notes: string[];
}