interface Category{
    id:number,
    name:string,
    image:string,
    creationAt:string,
    updatedAt:string
}

export interface Product{
    id: string;
    title: string;
    price: number;
    description: string;
    images: string;
    imageURL: string;
    imageAlt: string;
    imageCredit: string;
    category:Category
}

