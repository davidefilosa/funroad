import React from "react";

interface SubacategoryPageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const SubacategoryPage = async ({ params }: SubacategoryPageProps) => {
  const { subcategory, category } = await params;
  return (
    <div>
      {subcategory}
      {category}
    </div>
  );
};

export default SubacategoryPage;
