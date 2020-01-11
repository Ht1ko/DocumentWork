
export class Document{
	id:number;
	title:string;
	content: string;
	date: string;
	contractOwner:string;
	contractTarget:string;
	dateEnd:string;
	constructor(title:string,content: string,date: string,contractOwner:string,contractTarget:string,dateEnd:string){
		this.title=title;
		this.content=content;
		this.date=date;
		this.contractOwner=contractOwner;
		this.contractTarget=contractTarget;
		this.dateEnd=dateEnd;
	}
}