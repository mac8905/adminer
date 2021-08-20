export class Users {
    public username: string;
    public password: string;
    public name: string;
    public lastname: string;
    public full_names: string;
    public phone: string;
    public mobile: string;
    public email: string;
    public creator: string;
    public status: string;
    public profile: string;
    public created: Date;
    public updated: Date;

    public constructor( data: any = {}) {
        this.username = data.username || null;
        this.password = data.password || null;
        this.name = data.name || null;
        this.lastname = data.lastname || null;
        this.full_names = data.full_names || null;
        this.phone = data.phone || null;
        this.mobile = data.mobile || null;
        this.email = data.email || null;
        this.creator = data.creator || null;
        this.status = data.status || null;
        this.profile = data.profile || null;
        this.created = data.created || Date.now();
        this.updated = data.updated || null;
    }
}
