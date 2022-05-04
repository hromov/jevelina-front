export interface ListFilter {
    limit?: number;
    offset?: number;
    active?: boolean;
    step?: number;
    query?: string;
    id?: number;
    responsible?: number;
    contact?: number;
    min_date?: Date
    max_date?: Date
    parent?: number;
}
export interface Contact {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    IsPerson: boolean;
    Name: string;
    SecondName: string;
    ResponsibleID: number;
    Responsible: User;
    CreatedID?: any;
    Created: User;
    Tags: Tag[];
    Phone: string;
    SecondPhone: string;
    Email: string;
    SecondEmail: string;
    URL: string;
    City: string;
    Address: string;
    SourceID?: any;
    Source: Source;
    Position: string;
    Analytics: Analytics;
}

export interface Role {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Role: string;
    Priority: number;
}

export interface User {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
    Email: string;
    RoleID: number;
    Role: Role;
    Hash: string;
    Distribution: number;
}

export interface Source {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
}

export interface Analytics {
    CID: string;
    UID: string;
    TID: string;
    UtmID: string;
    UtmSource: string;
    UtmMedium: string;
    UtmCampaign: string;
    Domain: string;
}

export interface Role {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Role: string;
}

export interface Step {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
    Order: number;
    Active: boolean;
}

export interface Tag {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
}

export interface Product {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
}

export interface Manufacturer {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
}

export interface Lead {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    ClosedAt?: any;
    DeletedAt?: any;
    Name: string;
    Budget: number;
    Profit: number;
    ContactID: number;
    Contact: Contact;
    ResponsibleID: number;
    Responsible: User;
    CreatedID?: any;
    Created: User;
    StepID: number;
    Step: Step;
    ProductID?: any;
    Product: Product;
    ManufacturerID?: any;
    Manufacturer: Manufacturer;
    SourceID: number;
    Source: Source;
    Tags: Tag[];
    Analytics: Analytics;
}

export interface TaskType {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
}

export interface Task {
    ID: number;
    ParentID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    DeadLine?: any;
    Completed: boolean;
    TaskTypeID?: any;
    TaskType: TaskType;
    Files: string;
    Description: string;
    Results: string;
    ResponsibleID: number;
    Responsible: User;
    CreatedID: number;
    Created: User;
    UpdateID: number;
    Updated: User;
}

export interface Wallet {
    ID: number;
    ParentID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
    Balance: number;
    Closed: boolean;
}

export interface Transfer {
	ID: number;
	ParentID: number;
	CreatedAt: Date;
	CreatedBy: number;
	UpdatedAt: Date;
	DeletedAt: Date;
	Completed: boolean;
	CompletedAt: Date;
	CompletedBy: number;
	From: number;
	To: number;
	Category: string;
	Amount: number;
	Files: File[];
}

export interface File {
    Name: string;
    URL: string;
}
