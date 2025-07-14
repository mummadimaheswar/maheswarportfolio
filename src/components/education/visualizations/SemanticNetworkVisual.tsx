
// Import A-Frame first to avoid "AFRAME is not defined" errors
import 'aframe';
import { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Node {
  id: string;
  name: string;
  group: number;
  val: number;
  x?: number;
  y?: number;
}

interface Link {
  source: string;
  target: string;
  type: string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const initialData: GraphData = {
  nodes: [
    { id: 'animal', name: 'Animal', group: 1, val: 20 },
    { id: 'mammal', name: 'Mammal', group: 1, val: 15 },
    { id: 'bird', name: 'Bird', group: 1, val: 15 },
    { id: 'dog', name: 'Dog', group: 2, val: 10 },
    { id: 'cat', name: 'Cat', group: 2, val: 10 },
    { id: 'eagle', name: 'Eagle', group: 3, val: 10 },
    { id: 'sparrow', name: 'Sparrow', group: 3, val: 10 },
    { id: 'fido', name: 'Fido', group: 2, val: 5 },
    { id: 'fluffy', name: 'Fluffy', group: 2, val: 5 },
    { id: 'hunter', name: 'Hunter', group: 3, val: 5 },
    { id: 'tweet', name: 'Tweet', group: 3, val: 5 },
  ],
  links: [
    { source: 'mammal', target: 'animal', type: 'is-a' },
    { source: 'bird', target: 'animal', type: 'is-a' },
    { source: 'dog', target: 'mammal', type: 'is-a' },
    { source: 'cat', target: 'mammal', type: 'is-a' },
    { source: 'eagle', target: 'bird', type: 'is-a' },
    { source: 'sparrow', target: 'bird', type: 'is-a' },
    { source: 'fido', target: 'dog', type: 'instance-of' },
    { source: 'fluffy', target: 'cat', type: 'instance-of' },
    { source: 'hunter', target: 'eagle', type: 'instance-of' },
    { source: 'tweet', target: 'sparrow', type: 'instance-of' },
  ]
};

const aiKnowledgeData: GraphData = {
  nodes: [
    { id: 'ai', name: 'Artificial Intelligence', group: 1, val: 25 },
    { id: 'ml', name: 'Machine Learning', group: 1, val: 20 },
    { id: 'dl', name: 'Deep Learning', group: 1, val: 18 },
    { id: 'krr', name: 'Knowledge Representation', group: 2, val: 20 },
    { id: 'sup', name: 'Supervised Learning', group: 3, val: 15 },
    { id: 'unsup', name: 'Unsupervised Learning', group: 3, val: 15 },
    { id: 'rl', name: 'Reinforcement Learning', group: 3, val: 15 },
    { id: 'cnn', name: 'Convolutional Networks', group: 4, val: 10 },
    { id: 'rnn', name: 'Recurrent Networks', group: 4, val: 10 },
    { id: 'logic', name: 'Logical Representation', group: 5, val: 12 },
    { id: 'frames', name: 'Frames', group: 5, val: 12 },
    { id: 'semantic', name: 'Semantic Networks', group: 5, val: 12 },
  ],
  links: [
    { source: 'ml', target: 'ai', type: 'is-a' },
    { source: 'dl', target: 'ml', type: 'is-a' },
    { source: 'krr', target: 'ai', type: 'is-a' },
    { source: 'sup', target: 'ml', type: 'is-a' },
    { source: 'unsup', target: 'ml', type: 'is-a' },
    { source: 'rl', target: 'ml', type: 'is-a' },
    { source: 'cnn', target: 'dl', type: 'is-a' },
    { source: 'rnn', target: 'dl', type: 'is-a' },
    { source: 'logic', target: 'krr', type: 'is-a' },
    { source: 'frames', target: 'krr', type: 'is-a' },
    { source: 'semantic', target: 'krr', type: 'is-a' },
  ]
};

const SemanticNetworkVisual = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphData, setGraphData] = useState<GraphData>(initialData);
  const [selectedExample, setSelectedExample] = useState<'taxonomy' | 'ai'>('taxonomy');
  const [hoverNode, setHoverNode] = useState<Node | null>(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const updateDimensions = () => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: 450 // Fixed height for the graph
          });
        }
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, []);
  
  const handleExampleChange = (example: 'taxonomy' | 'ai') => {
    setSelectedExample(example);
    setGraphData(example === 'taxonomy' ? initialData : aiKnowledgeData);
  };

  return (
    <div className="flex flex-col h-full" ref={containerRef}>
      <div className="flex justify-center space-x-4 mb-4">
        <Button 
          variant={selectedExample === 'taxonomy' ? 'default' : 'outline'} 
          onClick={() => handleExampleChange('taxonomy')}
          className={selectedExample === 'taxonomy' ? 'bg-cyberpunk-purple hover:bg-cyberpunk-purple/80' : ''}
        >
          Animal Taxonomy
        </Button>
        <Button 
          variant={selectedExample === 'ai' ? 'default' : 'outline'} 
          onClick={() => handleExampleChange('ai')}
          className={selectedExample === 'ai' ? 'bg-cyberpunk-purple hover:bg-cyberpunk-purple/80' : ''}
        >
          AI Knowledge Domain
        </Button>
      </div>
      
      <div className="flex-1 bg-card/30 rounded-lg border border-muted overflow-hidden relative">
        {dimensions.width > 0 && (
          <ForceGraph2D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeRelSize={6}
            nodeVal={(node) => (node as Node).val}
            nodeColor={(node) => {
              const n = node as Node;
              const colors = [
                '#9b87f5', // Cyberpunk Purple
                '#7E69AB', // Lighter Purple
                '#0EA5E9', // Cyberpunk Teal
                '#39FF14', // Neon Green
                '#556B2F'  // Olive Green
              ];
              return colors[(n.group % colors.length)];
            }}
            nodeLabel={(node) => (node as Node).name}
            linkLabel={(link) => (link as Link).type}
            linkColor={() => '#9b87f550'}
            linkWidth={2}
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            onNodeHover={(node) => setHoverNode(node as Node | null)}
            cooldownTicks={100}
            nodeCanvasObjectMode={() => 'after'}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const n = node as Node & { x?: number; y?: number };
              if (n.x === undefined || n.y === undefined) return;
              
              const fontSize = 12 / globalScale;
              ctx.font = `${fontSize}px Inter`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'white';
              ctx.fillText(n.name, n.x, n.y + 10);
            }}
          />
        )}
        
        {/* Info panel */}
        {hoverNode && (
          <motion.div 
            className="absolute top-4 right-4 p-4 bg-card/90 backdrop-blur-sm rounded-lg border border-muted shadow-lg max-w-xs"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-foreground">{hoverNode.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Node Type: {hoverNode.group === 1 ? 'Top-level Concept' : 
                         hoverNode.group === 2 ? 'Category' : 
                         hoverNode.group === 3 ? 'Subcategory' : 
                         hoverNode.group === 4 ? 'Specialized Concept' : 
                         'Instance'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Connections: {graphData.links.filter(link => 
                link.source === hoverNode.id || 
                (typeof link.source === 'object' && (link.source as Node).id === hoverNode.id) ||
                link.target === hoverNode.id || 
                (typeof link.target === 'object' && (link.target as Node).id === hoverNode.id)
              ).length}
            </p>
          </motion.div>
        )}
      </div>
      
      <div className="mt-4 p-4 rounded-lg bg-card/30 border border-muted">
        <h4 className="text-sm font-semibold mb-2">{selectedExample === 'taxonomy' ? 'Animal Taxonomy Example' : 'AI Knowledge Domain Example'}</h4>
        <p className="text-xs text-muted-foreground">
          {selectedExample === 'taxonomy' 
            ? 'This semantic network shows hierarchical relationships in animal taxonomy. Hover over nodes to see details and drag nodes to rearrange the network.'
            : 'This semantic network represents the domain of Artificial Intelligence. Explore the relationships between different AI subfields and concepts.'
          }
        </p>
      </div>
    </div>
  );
};

export default SemanticNetworkVisual;
