import React from "react";

const BlogCard = ({ project }) => {
  return (
    <div className="blog-card max-w-sm mx-auto my-4 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="meta relative">
        <div
          className="photo absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.image})` }}
        ></div>
        <ul className="details absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 text-white p-3 transition-all duration-200 ease-in-out hover:left-0">
          <li className="author">
            <a href="#">{project.author}</a>
          </li>
          <li className="date">{project.date}</li>
          <li className="tags">
            <ul className="flex space-x-2">
              {project.tags.map((tag, idx) => (
                <li key={idx}>
                  <a href="#">{tag}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="description p-4">
        <h1 className="text-2xl font-bold text-red-600">{project.title}</h1>
        <h2 className="text-sm font-light text-gray-600 mt-2">{project.subtitle}</h2>
        <p className="mt-4">{project.description}</p>
        <p className="read-more text-right mt-4">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            Read More
          </a>
        </p>
      </div>
    </div>
  );
};

export default function BlogList() {
  const projects = [
    {
      id: 1,
      image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg",
      title: "Learning to Code",
      subtitle: "Opening a door to the future",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      author: "John Doe",
      date: "Aug. 24, 2015",
      tags: ["Learn", "Code", "HTML", "CSS"],
    },
    {
      id: 2,
      image: "https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg",
      title: "Mastering the Language",
      subtitle: "Java is not the same as JavaScript",
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      author: "Jane Doe",
      date: "July. 15, 2015",
      tags: ["Learn", "Code", "JavaScript"],
    },
  ];

  return (
    <div className="container mx-auto">
      {projects.map((project) => (
        <BlogCard key={project.id} project={project} />
      ))}
    </div>
  );
}
