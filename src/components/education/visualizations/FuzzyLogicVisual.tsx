
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// Sample fuzzy sets for temperature
const coldMembership = (temp: number) => {
  if (temp <= 0) return 1;
  if (temp >= 20) return 0;
  return 1 - (temp / 20);
};

const coolMembership = (temp: number) => {
  if (temp <= 0) return 0;
  if (temp >= 30) return 0;
  if (temp <= 15) return temp / 15;
  return (30 - temp) / 15;
};

const warmMembership = (temp: number) => {
  if (temp <= 10) return 0;
  if (temp >= 40) return 0;
  if (temp <= 25) return (temp - 10) / 15;
  return (40 - temp) / 15;
};

const hotMembership = (temp: number) => {
  if (temp <= 20) return 0;
  if (temp >= 40) return 1;
  return (temp - 20) / 20;
};

// Sample fuzzy sets for fan speed
const lowFanMembership = (speed: number) => {
  if (speed <= 0) return 1;
  if (speed >= 50) return 0;
  return 1 - (speed / 50);
};

const mediumFanMembership = (speed: number) => {
  if (speed <= 0) return 0;
  if (speed >= 100) return 0;
  if (speed <= 50) return speed / 50;
  return (100 - speed) / 50;
};

const highFanMembership = (speed: number) => {
  if (speed <= 50) return 0;
  if (speed >= 100) return 1;
  return (speed - 50) / 50;
};

// Helper function to draw a fuzzy membership function curve
const drawMembershipFunction = (
  ctx: CanvasRenderingContext2D, 
  membershipFn: (x: number) => number, 
  minX: number, 
  maxX: number, 
  color: string,
  label: string,
  xAxisLabel: string,
  canvasWidth: number,
  canvasHeight: number,
  fill: boolean = false,
  highlightValue: number | null = null
) => {
  const padding = 40;
  const graphWidth = canvasWidth - (padding * 2);
  const graphHeight = canvasHeight - (padding * 2);
  
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  if (fill) {
    ctx.fillStyle = color + '33'; // Add transparency
  }
  
  // Start at left edge
  const startX = padding;
  const startY = canvasHeight - padding - (membershipFn(minX) * graphHeight);
  ctx.moveTo(startX, startY);
  
  // Draw the curve
  for (let pixelX = 0; pixelX <= graphWidth; pixelX++) {
    const x = minX + (pixelX / graphWidth) * (maxX - minX);
    const y = canvasHeight - padding - (membershipFn(x) * graphHeight);
    ctx.lineTo(padding + pixelX, y);
  }
  
  if (fill) {
    ctx.lineTo(padding + graphWidth, canvasHeight - padding);
    ctx.lineTo(padding, canvasHeight - padding);
    ctx.closePath();
    ctx.fill();
  }
  
  ctx.stroke();
  
  // Draw x-axis
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, canvasHeight - padding);
  ctx.lineTo(canvasWidth - padding, canvasHeight - padding);
  ctx.stroke();
  
  // Draw y-axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvasHeight - padding);
  ctx.stroke();
  
  // Draw x-axis label
  ctx.fillStyle = '#888';
  ctx.font = '12px Inter';
  ctx.textAlign = 'center';
  ctx.fillText(xAxisLabel, canvasWidth / 2, canvasHeight - 10);
  
  // Draw y-axis label
  ctx.save();
  ctx.translate(15, canvasHeight / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.fillText('Membership', 0, 0);
  ctx.restore();
  
  // Draw min and max values on x-axis
  ctx.textAlign = 'center';
  ctx.fillText(minX.toString(), padding, canvasHeight - padding + 15);
  ctx.fillText(maxX.toString(), canvasWidth - padding, canvasHeight - padding + 15);
  
  // Draw label
  ctx.fillStyle = color;
  ctx.font = '14px Inter';
  ctx.textAlign = 'left';
  ctx.fillText(label, padding + 10, padding + 20);
  
  // Highlight a specific value if provided
  if (highlightValue !== null) {
    const membership = membershipFn(highlightValue);
    const highlightX = padding + ((highlightValue - minX) / (maxX - minX)) * graphWidth;
    const highlightY = canvasHeight - padding - (membership * graphHeight);
    
    // Draw vertical line to show the input value
    ctx.strokeStyle = '#ffffff';
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    ctx.moveTo(highlightX, canvasHeight - padding);
    ctx.lineTo(highlightX, highlightY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw horizontal line to show membership value
    ctx.beginPath();
    ctx.moveTo(padding, highlightY);
    ctx.lineTo(highlightX, highlightY);
    ctx.stroke();
    
    // Draw value point
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(highlightX, highlightY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw text for the membership value
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'left';
    ctx.font = '12px Inter';
    ctx.fillText(`${label}: ${membership.toFixed(2)}`, padding + 5, highlightY - 5);
  }
};

// Calculate fan speed based on fuzzy rules
const calculateFanSpeed = (temperature: number) => {
  // Calculate membership values for temperature
  const cold = coldMembership(temperature);
  const cool = coolMembership(temperature);
  const warm = warmMembership(temperature);
  const hot = hotMembership(temperature);
  
  // Fuzzy rules
  // Rule 1: If temperature is cold, then fan speed is low
  const rule1 = cold;
  
  // Rule 2: If temperature is cool, then fan speed is low
  const rule2 = cool;
  
  // Rule 3: If temperature is warm, then fan speed is medium
  const rule3 = warm;
  
  // Rule 4: If temperature is hot, then fan speed is high
  const rule4 = hot;
  
  // Defuzzification using center of gravity method (simplified)
  const numerator = (rule1 * 0) + (rule2 * 25) + (rule3 * 50) + (rule4 * 100);
  const denominator = rule1 + rule2 + rule3 + rule4;
  
  // Avoid division by zero
  if (denominator === 0) return 0;
  
  return numerator / denominator;
};

const FuzzyLogicVisual = () => {
  const [temperature, setTemperature] = useState(25);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [showMembership, setShowMembership] = useState<'temperature' | 'fan'>('temperature');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Calculate fan speed based on temperature
    const calculatedSpeed = calculateFanSpeed(temperature);
    setFanSpeed(calculatedSpeed);
    
    // Draw membership functions
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (showMembership === 'temperature') {
      // Draw temperature membership functions
      drawMembershipFunction(ctx, coldMembership, 0, 40, '#9b87f5', 'Cold', 'Temperature (°C)', canvas.width, canvas.height, true, temperature);
      drawMembershipFunction(ctx, coolMembership, 0, 40, '#0EA5E9', 'Cool', 'Temperature (°C)', canvas.width, canvas.height, true, temperature);
      drawMembershipFunction(ctx, warmMembership, 0, 40, '#FFA500', 'Warm', 'Temperature (°C)', canvas.width, canvas.height, true, temperature);
      drawMembershipFunction(ctx, hotMembership, 0, 40, '#FF3B30', 'Hot', 'Temperature (°C)', canvas.width, canvas.height, true, temperature);
    } else {
      // Draw fan speed membership functions
      drawMembershipFunction(ctx, lowFanMembership, 0, 100, '#9b87f5', 'Low', 'Fan Speed (%)', canvas.width, canvas.height, true, fanSpeed);
      drawMembershipFunction(ctx, mediumFanMembership, 0, 100, '#0EA5E9', 'Medium', 'Fan Speed (%)', canvas.width, canvas.height, true, fanSpeed);
      drawMembershipFunction(ctx, highFanMembership, 0, 100, '#39FF14', 'High', 'Fan Speed (%)', canvas.width, canvas.height, true, fanSpeed);
    }
  }, [temperature, showMembership, fanSpeed]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`${showMembership === 'temperature' ? 'bg-cyberpunk-neon-green text-black' : ''}`}
            onClick={() => setShowMembership('temperature')}
          >
            Temperature Membership
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`${showMembership === 'fan' ? 'bg-cyberpunk-neon-green text-black' : ''}`}
            onClick={() => setShowMembership('fan')}
          >
            Fan Speed Membership
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div className="h-[300px] bg-card/30 rounded-lg border border-muted mb-4 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={800} 
            height={300} 
            className="w-full h-full"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card/30 border border-muted">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Temperature</h3>
              <span className="text-cyberpunk-neon-green font-mono">{temperature}°C</span>
            </div>
            <Slider
              value={[temperature]}
              min={0}
              max={40}
              step={1}
              onValueChange={(value) => setTemperature(value[0])}
              className="py-4"
            />
            <div className="grid grid-cols-4 text-xs text-muted-foreground">
              <div>Cold</div>
              <div className="text-center">Cool</div>
              <div className="text-center">Warm</div>
              <div className="text-right">Hot</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-card/30 border border-muted">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Fan Speed</h3>
              <span className="text-cyberpunk-neon-green font-mono">{Math.round(fanSpeed)}%</span>
            </div>
            
            <div className="h-8 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyberpunk-purple via-cyberpunk-teal to-cyberpunk-neon-green"
                initial={{ width: '0%' }}
                animate={{ width: `${fanSpeed}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Activated Rules:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rule 1: If temperature is COLD, then fan speed is LOW</span>
                  <span className="font-mono">{coldMembership(temperature).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rule 2: If temperature is COOL, then fan speed is LOW</span>
                  <span className="font-mono">{coolMembership(temperature).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rule 3: If temperature is WARM, then fan speed is MEDIUM</span>
                  <span className="font-mono">{warmMembership(temperature).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rule 4: If temperature is HOT, then fan speed is HIGH</span>
                  <span className="font-mono">{hotMembership(temperature).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuzzyLogicVisual;
