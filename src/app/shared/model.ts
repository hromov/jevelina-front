export interface ListFilter {
    limit?: number;
    offset?: number;
    active?: boolean;
    step?: number;
    query?: string;
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
}
