import React from "react";
import ListSection from "./_components/ListSection";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <section>
      <p>Project page {id}</p>
      <ListSection />
    </section>
  );
}
