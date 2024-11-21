
export type Credentials = {
    username: string;
    password: string;
}

export type Role = {
    roleID: number
    role_name: string    
}

export type User = {
    username: string;
    password: string;
    role: Role;
}

export type ActiveSession = {
    token: string;
    username: string;
    role: Role;
}
