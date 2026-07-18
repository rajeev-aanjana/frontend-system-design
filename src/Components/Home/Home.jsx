import { Link } from "react-router-dom";

const Home = () => {
  const projects = [
    {
      title: "Accordion",
      path: "/accordion",
      description: "Expand and collapse content dynamically.",
    },
    {
      title: "Password Generator",
      path: "/password-generator",
      description: "Generate strong and secure passwords instantly.",
    },
    {
      title: "Todo App",
      path: "/todo",
      description: "Manage your daily tasks efficiently.",
    },
    {
      title: "Pagination",
      path: "/pagination",
      description: "Learn client-side pagination implementation.",
    },
    {
      title: "Carousel",
      path: "/carousel",
      description: "Image slider with smooth transitions.",
    },
    {
      title: "Autocomplete Search",
      path: "/autocomplete-search",
      description: "Real-time search suggestions feature.",
    },
    {
      title: "Infinite Scroll",
      path: "/infinite-scroll",
      description: "Load data dynamically while scrolling.",
    },
    {
      title: "Drag & Drop (Kanban Board)",
      path: "/drag&drop",
      description: "Drag & Drop functionality like jira manges task states.",
    },
    {
      title: "OTP Input",
      path: "/otp-input",
      description:
        "Same functionality like real OTP, we can paste the otp automatically focus on next once the filled is fill by value.",
    },
    {
      title: "Practice/Test",
      path: "/practice",
      description: "Practice for interview.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          React Machine Coding Projects
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A collection of React projects built using modern concepts like hooks,
          routing, infinite scrolling, pagination, reusable components, and
          Tailwind CSS.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.title}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              {project.title}
            </h2>

            <p className="text-gray-600 mb-6">{project.description}</p>

            <Link
              to={project.path}
              className="inline-block bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition duration-200"
            >
              View Project
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
