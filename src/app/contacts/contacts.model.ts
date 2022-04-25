export interface ListFilter {
    limit?: number;
    offset?: number;
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
    Responsible: Responsible;
    CreatedID?: any;
    Created: Created;
    Tags: any[];
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

export interface Responsible {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
    Email: string;
    RoleID: number;
    Role: Role;
}

export interface Created {
    ID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    DeletedAt?: any;
    Name: string;
    Email: string;
    RoleID?: any;
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


    // "ID": 44193054,
    // "CreatedAt": "2022-04-24T20:56:59.15+03:00",
    // "UpdatedAt": "2022-04-24T20:56:59.15+03:00",
    // "DeletedAt": null,
    // "IsPerson": true,
    // "Name": "Сергей",
    // "SecondName": "",
    // "ResponsibleID": 3,
    // "Responsible": {
    // "ID": 3,
    // "CreatedAt": "2022-04-24T20:56:54.923+03:00",
    // "UpdatedAt": "2022-04-24T20:56:54.923+03:00",
    // "DeletedAt": null,
    // "Name": "Антон",
    // "Email": "email_4@gmail.com",
    // "RoleID": 1,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "CreatedID": null,
    // "Created": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": "",
    // "Email": "",
    // "RoleID": null,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "Tags": [],
    // "Phone": "",
    // "SecondPhone": "",
    // "Email": "",
    // "SecondEmail": "",
    // "URL": "",
    // "City": "",
    // "Address": "",
    // "SourceID": null,
    // "Source": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": ""
    // },
    // "Position": "",
    // "Analytics": {
    // "CID": "",
    // "UID": "",
    // "TID": "",
    // "UtmID": "",
    // "UtmSource": "",
    // "UtmMedium": "",
    // "UtmCampaign": "",
    // "Domain": ""
    // }
    // },
    // {
    // "ID": 44193058,
    // "CreatedAt": "2022-04-24T20:56:59.147+03:00",
    // "UpdatedAt": "2022-04-24T20:56:59.147+03:00",
    // "DeletedAt": null,
    // "IsPerson": true,
    // "Name": "Сергей",
    // "SecondName": "",
    // "ResponsibleID": 3,
    // "Responsible": {
    // "ID": 3,
    // "CreatedAt": "2022-04-24T20:56:54.923+03:00",
    // "UpdatedAt": "2022-04-24T20:56:54.923+03:00",
    // "DeletedAt": null,
    // "Name": "Антон",
    // "Email": "email_4@gmail.com",
    // "RoleID": 1,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "CreatedID": null,
    // "Created": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": "",
    // "Email": "",
    // "RoleID": null,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "Tags": [],
    // "Phone": "",
    // "SecondPhone": "",
    // "Email": "",
    // "SecondEmail": "",
    // "URL": "",
    // "City": "",
    // "Address": "",
    // "SourceID": null,
    // "Source": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": ""
    // },
    // "Position": "",
    // "Analytics": {
    // "CID": "",
    // "UID": "",
    // "TID": "",
    // "UtmID": "",
    // "UtmSource": "",
    // "UtmMedium": "",
    // "UtmCampaign": "",
    // "Domain": ""
    // }
    // },
    // {
    // "ID": 44193056,
    // "CreatedAt": "2022-04-24T20:56:59.143+03:00",
    // "UpdatedAt": "2022-04-24T20:56:59.143+03:00",
    // "DeletedAt": null,
    // "IsPerson": true,
    // "Name": "Сергей",
    // "SecondName": "",
    // "ResponsibleID": 3,
    // "Responsible": {
    // "ID": 3,
    // "CreatedAt": "2022-04-24T20:56:54.923+03:00",
    // "UpdatedAt": "2022-04-24T20:56:54.923+03:00",
    // "DeletedAt": null,
    // "Name": "Антон",
    // "Email": "email_4@gmail.com",
    // "RoleID": 1,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "CreatedID": null,
    // "Created": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": "",
    // "Email": "",
    // "RoleID": null,
    // "Role": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Role": ""
    // }
    // },
    // "Tags": [],
    // "Phone": "",
    // "SecondPhone": "",
    // "Email": "",
    // "SecondEmail": "",
    // "URL": "",
    // "City": "",
    // "Address": "",
    // "SourceID": null,
    // "Source": {
    // "ID": 0,
    // "CreatedAt": "0001-01-01T00:00:00Z",
    // "UpdatedAt": "0001-01-01T00:00:00Z",
    // "DeletedAt": null,
    // "Name": ""
    // },
    // "Position": "",
    // "Analytics": {
    // "CID": "",
    // "UID": "",
    // "TID": "",
    // "UtmID": "",
    // "UtmSource": "",
    // "UtmMedium": "",
    // "UtmCampaign": "",
    // "Domain": ""
    // }
    // }