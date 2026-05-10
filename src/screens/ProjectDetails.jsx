// ProjectDetails.jsx
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../api/sanity";
import "../styles/ProjectDetails.css";
import { useScroll, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis"; // Initialize Sanity image URL builder
const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectDetails = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const { slug } = useParams();
  const { projects, loading } = useProjects();
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  // Find the current project by slug
  const project = projects.find((p) => p.slug?.current === slug);
  console.log("Project Details - Found project:", project);
  if (loading) {
    return (
      <div className="project-details-loading">
        <div className="loader"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-details-error">
        <h2>Project not found</h2>
        <Link to="/" className="back-button">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Coming Soon";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <div className="project-details">
      {/* HERO IMAGE */}
      <section className="hero-section">
        <img
          className="hero-image"
          src={urlFor(project.cover).url()}
          alt={project.title}
        />
      </section>

      {/* PROJECT INFO */}
      <section className="project-info">
        <div className="info-container">
          <div className="project-meta">
            <span>{formatDate(project.date)}</span>
          </div>

          <h1 className="project-details-title">{project.title}</h1>

          {project.tags && (
            <div className="project-tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="project-description">
            <p>{project.description}</p>
          </div>

          <div className="project-actions">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-live"
              >
                View Live
              </a>
            )}

            <Link to="/" className="btn-back">
              Back
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="gallery-section">
          {project.gallery.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={urlFor(image).url()} alt={`Gallery ${index + 1}`} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
