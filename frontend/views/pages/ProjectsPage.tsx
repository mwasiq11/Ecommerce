
import React from 'react';
import Button from '../../components/ui/Button';

const ProjectsPage: React.FC = () => {
  const projects = [
    {
      title: 'Global Supply Chain Modernization',
      category: 'Logistics',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&h=600&q=80',
      desc: 'How we helped a major retailer optimize their cross-border shipping and supplier management.',
      tags: ['Supply Chain', 'Global Export']
    },
    {
      title: 'Eco-Friendly Industrial Manufacturing',
      category: 'Manufacturing',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&h=600&q=80',
      desc: 'Implementation of sustainable practices in large-scale machinery production for the 2030 green initiative.',
      tags: ['Sustainability', 'Manufacturing']
    },
    {
      title: 'Smart Warehouse Automation',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=800&h=600&q=80',
      desc: 'Integrating AI-driven inventory tracking for over 500 warehouses globally.',
      tags: ['AI', 'Automation', 'Warehouse']
    },
    {
      title: 'Direct-to-Supplier Platform',
      category: 'B2B',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=600&q=80',
      desc: 'Developing a seamless communication portal for small businesses to reach top manufacturers.',
      tags: ['B2B', 'Tech Solution']
    }
  ];

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900">Our Projects</h1>
        <p className="text-gray-500 max-w-2xl text-lg">Discover how we bridge the gap between world-class suppliers and businesses to deliver innovative solutions across industries.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {projects.map((project, i) => (
          <div key={i} className="group bg-white rounded-3xl overflow-hidden border border-border-color shadow-sm hover:shadow-2xl transition-all duration-500">
            <div className="aspect-[16/9] overflow-hidden relative">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 left-6">
                <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-primary uppercase shadow-lg border border-primary/10">{project.category}</span>
              </div>
            </div>
            <div className="p-10">
              <div className="flex gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-blue-50 text-primary px-3 py-1 rounded-full font-black uppercase tracking-widest">#{tag}</span>
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">{project.desc}</p>
              <Button variant="outline" className="px-8 rounded-full border-2 font-bold">Read Case Study</Button>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-[3rem] p-16 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <h2 className="text-4xl font-bold mb-6 relative z-10">Ready to start a project?</h2>
        <p className="text-blue-100/70 mb-10 max-w-xl mx-auto text-lg relative z-10 font-light">Our consultants are ready to help you optimize your business operations with our global network of verified suppliers.</p>
        <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 rounded-full px-12 h-14 text-lg font-bold shadow-xl border-none">Contact Business Development</Button>
      </section>
    </main>
  );
};

export default ProjectsPage;
