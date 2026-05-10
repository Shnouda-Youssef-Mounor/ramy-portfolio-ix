import { useEffect, useState } from "react";
import { client } from "../api/sanity";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "project"] | order(_createdAt desc)`)
      .then((data) => {
        console.log("Fetched projects:", data);
        setProjects(data);
        setLoading(false);
      });
  }, []);

  return { projects, loading };
};
