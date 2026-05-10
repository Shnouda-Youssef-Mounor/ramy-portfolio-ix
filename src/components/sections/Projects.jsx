import React from "react";
import { motion } from "framer-motion";
import { useProjects } from "../../hooks/useProjects";
import { urlFor } from "../../utils/imageUrl";
import { Link } from "react-router-dom";
import "../../styles/Projects.css";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Projects = () => {
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    );
  }

  return (
    <section className="projects-section" id="works">
      <div className="projects-grid">
        {projects
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((project, index) => (
            <motion.div
              key={project._id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={cardVariants}
            >
              <Link
                to={`/project/${project.slug.current}`}
                className="project-card"
              >
                {/* Layer 0 — colored glow */}
                <div className={`card-glow glow-${index % 8}`} />

                {/* Layer 1 — image with bottom fade */}
                <div className="project-image">
                  <img
                    src={urlFor(project.cover).width(800).url()}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>

                {/* Layer 2 — border with gradient mask */}
                <div className="project-border" />

                {/* Layer 3 — content */}
                <div className="project-content">
                  <div className="project-title-row">
                    <p className="project-title">{project.title}</p>
                    <div className="project-arrow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        fill="currentColor"
                      >
                        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
                      </svg>
                    </div>
                  </div>
                  <p className="project-desc">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default Projects;
