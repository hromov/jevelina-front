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
    from?: number;
    to?: number;
    wallet?: number;
    completed?: boolean;
    steps?: number[];
    ids?: number[];
}
export interface Contact {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
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

export interface User {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    Name: string;
    Email: string;
    Role: string;
    Hash: string;
    Distribution: number;
}

export interface ChangeUser {
  ID: number;
  Name: string;
  Email: string;
  RoleID: number;
  Hash: string;
  Distribution: number;
}

export interface Source {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
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
    DeletedAt?: Date;
    Role: string;
    Priority: number;
}

export interface Step {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    Name: string;
    Order: number;
    Active: boolean;
}

export interface Tag {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    Name: string;
}

export interface Product {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    Name: string;
}

export interface Manufacturer {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
    Name: string;
}

export interface Lead {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    ClosedAt?: any;
    DeletedAt?: Date;
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
    DeletedAt?: Date;
    Name: string;
}

export interface Task {
    ID: number;
    ParentID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: Date;
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
    DeletedAt?: Date;
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
    Description: string;
    DeletedBy: number;
}

export interface File {
    ID: number;
    ParentID: number;
    Name: string;
    URL: string;
}

export interface FileRequest {
    Name?: string;
    Value?: string;
    Type?: string;
    URL?: string;
    Parent?: number;
  }
