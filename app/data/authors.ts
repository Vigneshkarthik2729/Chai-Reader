export type Book = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export type Author = {
  id: string;
  slug: string;
  name: string;
  photo: string;
  bio: string;
  description: string;
  books: Book[];
};

// Import author images
import AuthorOne from "@/public/images/Author1.png";
import AuthorTwo from "@/public/images/Author2.png";
import AuthorThree from "@/public/images/Author3.png";
import AuthorFour from "@/public/images/Author4.png";
import AuthorFive from "@/public/images/Author5.png";

export const AUTHORS: Author[] = [
  {
    id: "1",
    slug: "jk-rowling",
    name: "J.K. Rowling",
    photo: AuthorOne.src,
    bio: "British author best known for creating the Harry Potter series, one of the most popular book series in history.",
    description:
      "Joanne Kathleen Rowling is a British author and philanthropist. She is best known for writing the Harry Potter fantasy series, which has been adapted into a highly successful film series, and has spawned multiple theatrical productions and a theme park.",
    books: [
      {
        id: "book-1",
        title: "Harry Potter and the Philosopher's Stone",
        description:
          "The first novel follows Harry Potter, a young wizard who discovers his magical heritage and attends Hogwarts School of Witchcraft and Wizardry.",
        image: "/images/book1.jpg",
      },
      {
        id: "book-2",
        title: "Harry Potter and the Chamber of Secrets",
        description:
          "Harry's second year at Hogwarts is marked by the opening of the Chamber of Secrets and the appearance of a mysterious monster.",
        image: "/images/book2.jpg",
      },
      {
        id: "book-3",
        title: "Harry Potter and the Prisoner of Azkaban",
        description:
          "Harry's third year brings the escape of a dangerous prisoner and new magical creatures to discover.",
        image: "/images/book3.jpg",
      },
      {
        id: "book-4",
        title: "Harry Potter and the Goblet of Fire",
        description:
          "The fourth book introduces the Triwizard Tournament and darker themes as Voldemort begins his return.",
        image: "/images/book4.jpg",
      },
      {
        id: "book-5",
        title: "The Casual Vacancy",
        description:
          "An adult novel exploring the darker side of a small English village after a death creates a vacancy on the parish council.",
        image: "/images/book5.jpg",
      },
    ],
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return AUTHORS.find((author) => author.slug === slug);
}

export function getAllAuthors(): Author[] {
  return AUTHORS;
}
