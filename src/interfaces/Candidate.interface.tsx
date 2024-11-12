// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    id: string;
    login: string;
    name: string;
    location: string;
    html_url: string;
    avatar_url: string;
    email: string;
    company: string;
    bio: string;
}