import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills } from '../../data/content';

export default function SkillsNetwork() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredNode, setHoveredNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!isInView || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // --- Graph Data Construction ---
    const nodes = [];
    const links = [];

    // Colors mapping based on category (simplified for canvas drawing)
    const colorMap = {
      'Agentic AI & LLMs': '#818cf8', // indigo
      'Machine Learning & Deep Learning': '#d946ef', // fuchsia
      'Full Stack & Real-time Systems': '#22d3ee', // cyan
      'DSA & Problem Solving': '#9ca3af', // gray
    };

    skills.forEach((skill, i) => {
      // Create main category node
      const categoryNode = {
        id: `cat_${skill.id}`,
        label: skill.category,
        isCategory: true,
        proficiency: skill.proficiency,
        description: skill.description,
        color: colorMap[skill.category] || '#ffffff',
        radius: 12,
        x: Math.random() * 800,
        y: Math.random() * 600,
        vx: 0,
        vy: 0,
      };
      nodes.push(categoryNode);

      // Create tech nodes
      skill.technologies.forEach((tech, j) => {
        const techNode = {
          id: `tech_${skill.id}_${j}`,
          label: tech,
          isCategory: false,
          color: categoryNode.color,
          radius: 4,
          x: Math.random() * 800,
          y: Math.random() * 600,
          vx: 0,
          vy: 0,
        };
        nodes.push(techNode);

        // Link tech to category
        links.push({
          source: techNode,
          target: categoryNode,
          distance: 80 + Math.random() * 40,
        });
      });
    });

    // Add some random cross-category links to make the network organic
    const cats = nodes.filter(n => n.isCategory);
    for (let i = 0; i < cats.length; i++) {
      for (let j = i + 1; j < cats.length; j++) {
        if (Math.random() > 0.4) {
          links.push({
            source: cats[i],
            target: cats[j],
            distance: 300,
            isCross: true
          });
        }
      }
    }

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      // Increase resolution for crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      setDimensions({ width: rect.width, height: rect.height });
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', resize);
    resize();

    // Interaction handlers
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // --- Physics Engine ---
    const tick = () => {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      // 1. Center Gravity
      nodes.forEach(node => {
        const dx = (width / 2) - node.x;
        const dy = (height / 2) - node.y;
        node.vx += dx * 0.0001; // weak center pull
        node.vy += dy * 0.0001;
      });

      // 2. Repulsion (Coulomb force)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          
          if (dist > 0 && dist < 300) {
            const force = 100 / distSq; // Inverse square law
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // 3. Springs (Hooke's law)
      links.forEach(link => {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0) {
          const force = (dist - link.distance) * 0.01; // Spring constant
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          link.source.vx += fx;
          link.source.vy += fy;
          link.target.vx -= fx;
          link.target.vy -= fy;
        }
      });

      // 4. Mouse Repulsion
      let currentHover = null;
      let minHoverDist = 40;

      nodes.forEach(node => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        // Repel
        if (dist < 150) {
          const force = (150 - dist) * 0.005;
          node.vx -= (dx / dist) * force;
          node.vy -= (dy / dist) * force;
        }

        // Hover detection
        if (dist < minHoverDist) {
          minHoverDist = dist;
          currentHover = node;
        }

        // 5. Apply velocity and friction
        node.vx *= 0.9; // Friction
        node.vy *= 0.9;
        node.x += node.vx;
        node.y += node.vy;

        // Bounding box bounce
        if (node.x < 50) { node.x = 50; node.vx *= -1; }
        if (node.x > width - 50) { node.x = width - 50; node.vx *= -1; }
        if (node.y < 50) { node.y = 50; node.vy *= -1; }
        if (node.y > height - 50) { node.y = height - 50; node.vy *= -1; }
      });

      if (currentHover !== hoveredNode) {
        setHoveredNode(currentHover);
      }

      // --- Drawing ---
      ctx.clearRect(0, 0, width, height);

      // Draw Links
      links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);
        
        // Highlight logic
        const isHovered = currentHover && (link.source === currentHover || link.target === currentHover);
        
        if (link.isCross) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${isHovered ? 0.2 : 0.05})`;
        } else {
          ctx.strokeStyle = isHovered 
            ? link.source.color 
            : `rgba(255, 255, 255, 0.15)`;
        }
        
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();
      });

      // Draw Nodes
      nodes.forEach(node => {
        const isHovered = currentHover === node;
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (isHovered ? 6 : 2), 0, Math.PI * 2);
        ctx.fillStyle = node.color + (isHovered ? '40' : '10'); // Hex alpha
        ctx.fill();

        // Draw solid core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * (isHovered ? 1.2 : 1), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Draw label
        if (node.isCategory || isHovered) {
          ctx.font = node.isCategory ? 'bold 14px "DM Mono", monospace' : '12px "DM Mono", monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(node.label, node.x, node.y - node.radius - 12);
        }
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isInView]);

  return (
    <section id="skills" className="relative bg-black min-h-screen py-24 overflow-hidden flex flex-col">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10 flex-1 flex flex-col">
        {/* Section Header */}
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            <div className="flex items-center gap-4">
                <span className="text-xs tracking-[0.3em] text-gray-600 uppercase">Expertise Network</span>
                <motion.div
                    className="flex-1 h-px bg-gray-900"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 }}
                    style={{ transformOrigin: "left" }}
                />
            </div>
            <p className="mt-4 text-gray-400 font-mono text-sm">
              &gt; INTERACT WITH NODES TO EXPLORE CAPABILITIES
            </p>
        </motion.div>

        {/* Neural Network Canvas */}
        <div ref={containerRef} className="relative flex-1 w-full min-h-[60vh] rounded-2xl border border-white/5 bg-white/5 overflow-hidden backdrop-blur-sm shadow-2xl">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full cursor-crosshair"
          />

          {/* Hover Details Panel */}
          {hoveredNode && hoveredNode.isCategory && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-6 left-6 max-w-sm p-6 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.8)] pointer-events-none"
            >
              <h3 className="text-xl font-bold mb-2" style={{ color: hoveredNode.color }}>
                {hoveredNode.label}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {hoveredNode.description}
              </p>
              <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${hoveredNode.proficiency}%`,
                    backgroundColor: hoveredNode.color,
                    boxShadow: `0 0 10px ${hoveredNode.color}`
                  }} 
                />
              </div>
              <div className="text-right text-xs mt-1 font-mono text-gray-500">
                PROFI: {hoveredNode.proficiency}%
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
