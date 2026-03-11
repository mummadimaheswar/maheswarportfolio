
import { useEffect, useRef, useState } from 'react';
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
  ],
  links: [
    { source: 'mammal', target: 'animal', type: 'is-a' },
    { source: 'bird', target: 'animal', type: 'is-a' },
    { source: 'dog', target: 'mammal', type: 'is-a' },
    { source: 'cat', target: 'mammal', type: 'is-a' },
    { source: 'eagle', target: 'bird', type: 'is-a' },
    { source: 'sparrow', target: 'bird', type: 'is-a' },
  ]
};

const aiKnowledgeData: GraphData = {
  nodes: [
    { id: 'ai', name: 'Artificial Intelligence', group: 1, val: 25 },
    { id: 'ml', name: 'Machine Learning', group: 1, val: 20 },
    { id: 'dl', name: 'Deep Learning', group: 1, val: 18 },
    { id: 'nlp', name: 'Natural Language Processing', group: 2, val: 15 },
    { id: 'cv', name: 'Computer Vision', group: 2, val: 15 },
    { id: 'nn', name: 'Neural Networks', group: 3, val: 12 },
    { id: 'tf', name: 'TensorFlow', group: 4, val: 10 },
    { id: 'sklearn', name: 'Scikit-learn', group: 4, val: 10 },
  ],
  links: [
    { source: 'ml', target: 'ai', type: 'is-a' },
    { source: 'dl', target: 'ml', type: 'is-a' },
    { source: 'nlp', target: 'ai', type: 'is-a' },
    { source: 'cv', target: 'ai', type: 'is-a' },
    { source: 'nn', target: 'dl', type: 'is-a' },
    { source: 'tf', target: 'ml', type: 'uses' },
    { source: 'sklearn', target: 'ml', type: 'uses' },
  ]
};

const SemanticNetworkVisual = () => {
  const [graphData, setGraphData] = useState<GraphData>(initialData);
  const [selectedExample, setSelectedExample] = useState<'taxonomy' | 'ai'>('taxonomy');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const handleExampleChange = (example: 'taxonomy' | 'ai') => {
    setSelectedExample(example);
    setGraphData(example === 'taxonomy' ? initialData : aiKnowledgeData);
    setSelectedNode(null);
  };

  const getNodeColor = (group: number) => {
    const colors = {
      1: 'bg-primary/20 text-primary border-primary/30',
      2: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
      3: 'bg-accent/20 text-accent-foreground border-accent/30',
      4: 'bg-muted/40 text-muted-foreground border-muted/60',
    };
    return colors[group as keyof typeof colors] || colors[1];
  };

  const getConnectedNodes = (nodeId: string) => {
    const connected = new Set<string>();
    graphData.links.forEach(link => {
      if (link.source === nodeId) connected.add(link.target);
      if (link.target === nodeId) connected.add(link.source);
    });
    return connected;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center space-x-4 mb-6">
        <Button 
          variant={selectedExample === 'taxonomy' ? 'default' : 'outline'} 
          onClick={() => handleExampleChange('taxonomy')}
        >
          Animal Taxonomy
        </Button>
        <Button 
          variant={selectedExample === 'ai' ? 'default' : 'outline'} 
          onClick={() => handleExampleChange('ai')}
        >
          AI Knowledge Domain
        </Button>
      </div>
      
      <div className="flex-1 bg-card/30 rounded-lg border border-border p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {graphData.nodes.map((node, index) => (
            <motion.div
              key={node.id}
              className={`
                relative p-4 rounded-lg cursor-pointer transition-all duration-300 border-2
                ${getNodeColor(node.group)}
                ${selectedNode?.id === node.id ? 'scale-105 shadow-lg' : 'hover:scale-102'}
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-semibold text-sm mb-1">{node.name}</h4>
              <p className="text-xs opacity-70">Value: {node.val}</p>
              
              {selectedNode?.id === node.id && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <span className="text-xs text-primary-foreground">✓</span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {selectedNode && (
          <motion.div
            className="bg-card/50 rounded-lg p-4 border border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-semibold mb-2">{selectedNode.name}</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Type:</span> {
                  selectedNode.group === 1 ? 'Top-level Concept' : 
                  selectedNode.group === 2 ? 'Category' : 
                  selectedNode.group === 3 ? 'Subcategory' : 
                  'Specialized Concept'
                }
              </p>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Connections:</span> {
                  graphData.links.filter(link => 
                    link.source === selectedNode.id || link.target === selectedNode.id
                  ).length
                }
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {graphData.links
                  .filter(link => link.source === selectedNode.id || link.target === selectedNode.id)
                  .map((link, index) => {
                    const connectedNodeId = link.source === selectedNode.id ? link.target : link.source;
                    const connectedNode = graphData.nodes.find(n => n.id === connectedNodeId);
                    return (
                      <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                        {link.type} → {connectedNode?.name}
                      </span>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      <div className="mt-4 p-4 rounded-lg bg-card/30 border border-border">
        <h4 className="text-sm font-semibold mb-2">
          {selectedExample === 'taxonomy' ? 'Animal Taxonomy Example' : 'AI Knowledge Domain Example'}
        </h4>
        <p className="text-xs text-muted-foreground">
          {selectedExample === 'taxonomy' 
            ? 'This semantic network shows hierarchical relationships in animal taxonomy. Click on nodes to explore their connections.'
            : 'This semantic network represents the domain of Artificial Intelligence. Explore the relationships between different AI subfields and concepts.'
          }
        </p>
      </div>
    </div>
  );
};

export default SemanticNetworkVisual;
