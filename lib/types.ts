export interface InnerCard {
    name: string;
    link: string;
    discripation: string;
}
  
export interface CardProps {
    title: string;
    icon: React.ElementType;
    innercard: InnerCard[];
}

export interface AboutData {
    author: string;
    bio: string;
    workingon: string;
    githublink?: string;
    xlink?: string;
    docks?: string;
}
  
export interface AuthorCardProps {
    about: AboutData;
}


type Item = {
    title: string;
    icon?: string;
    innercard: any[];
  };
  
export type Data = {
    about: {
      author: string;
      bio: string;
      workingon: string;
      githublink?: string;
      xlink?: string;
      docks?: string;
    };
    data: Item[];
};
  
  