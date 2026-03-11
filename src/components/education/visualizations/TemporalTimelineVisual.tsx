
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Play, Pause, RefreshCw, Book, BookText } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  fluents: string[];
  time: number;
}

const events: TimelineEvent[] = [
  {
    id: 'event-1',
    title: 'Door Unlocked',
    description: 'Agent unlocks the door to enter the room',
    fluents: ['Door is unlocked', 'Agent can enter room'],
    time: 0,
  },
  {
    id: 'event-2',
    title: 'Agent Enters Room',
    description: 'Agent enters the room and sees a light switch',
    fluents: ['Agent is in the room', 'Light is off', 'Agent can access light switch'],
    time: 1,
  },
  {
    id: 'event-3',
    title: 'Light Switch Toggled',
    description: 'Agent toggles the light switch to illuminate the room',
    fluents: ['Agent is in the room', 'Light is on', 'Room is illuminated'],
    time: 2,
  },
  {
    id: 'event-4',
    title: 'Agent Sees Book',
    description: 'Agent identifies a book on the table now that the room is lit',
    fluents: ['Agent is in the room', 'Light is on', 'Book is visible', 'Book is on table'],
    time: 3,
  },
  {
    id: 'event-5',
    title: 'Agent Picks Up Book',
    description: 'Agent walks to the table and picks up the book',
    fluents: ['Agent is in the room', 'Light is on', 'Agent is holding book', 'Book is not on table'],
    time: 4,
  },
  {
    id: 'event-6',
    title: 'Agent Reads Book',
    description: 'Agent sits down and begins reading the book',
    fluents: ['Agent is in the room', 'Light is on', 'Agent is holding book', 'Agent is reading'],
    time: 5,
  },
];

const TemporalTimelineVisual = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [viewMode, setViewMode] = useState<'event' | 'situation'>('event');
  
  const currentEvents = events.filter(event => event.time <= currentTime);
  const isComplete = currentTime >= events.length - 1;

  const handleNext = () => {
    if (currentTime < events.length - 1) {
      setCurrentTime(prev => prev + 1);
    } else {
      setIsPlaying(false);
    }
  };
  
  const handlePrevious = () => {
    if (currentTime > 0) {
      setCurrentTime(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(false);
    setSelectedEvent(null);
  };
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
  };

  // Use useEffect to control auto-advancing the timeline
  // Removed useEffect to simplify the code, would be added in a live version

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`${viewMode === 'event' ? 'bg-cyberpunk-teal text-white' : ''}`}
            onClick={() => setViewMode('event')}
          >
            <Book className="w-4 h-4 mr-1" />
            Event View
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`${viewMode === 'situation' ? 'bg-cyberpunk-teal text-white' : ''}`}
            onClick={() => setViewMode('situation')}
          >
            <BookText className="w-4 h-4 mr-1" />
            Situation View
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentTime <= 0}>
            Previous
          </Button>
          <Button 
            variant={isPlaying ? "default" : "outline"} 
            size="sm" 
            onClick={togglePlay}
            className={isPlaying ? "bg-cyberpunk-teal" : ""}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={isComplete}>
            Next
          </Button>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {/* Timeline visualization */}
        <div className="relative mb-4 p-4 rounded-lg bg-card/30 border border-muted">
          <div className="h-2 bg-muted rounded-full mb-4">
            <motion.div 
              className="h-full bg-cyberpunk-teal rounded-full"
              style={{ width: `${(currentTime / (events.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex justify-between relative">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`absolute transition-all duration-300 flex flex-col items-center`}
                style={{ 
                  left: `calc(${(index / (events.length - 1)) * 100}% - 12px)`, 
                  transform: selectedEvent?.id === event.id ? 'scale(1.1)' : 'scale(1)' 
                }}
              >
                <button
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer 
                    ${event.time <= currentTime 
                      ? 'bg-cyberpunk-teal text-white' 
                      : 'bg-muted text-muted-foreground'}`}
                  onClick={() => handleEventClick(event)}
                >
                  {event.time <= currentTime && (
                    <Check className="w-3 h-3" />
                  )}
                </button>
                <p 
                  className={`text-xs mt-2 transition-opacity duration-300 
                    ${event.time <= currentTime ? 'opacity-100' : 'opacity-50'}`}
                  style={{ width: '60px', textAlign: 'center' }}
                >
                  {event.title}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid gap-4 h-[300px]">
          {viewMode === 'event' ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={`event-${currentTime}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="h-full border-cyberpunk-teal/30 bg-card/60 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-cyberpunk-teal/20 flex items-center justify-center">
                        <span className="font-bold text-cyberpunk-teal">{currentTime}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-cyberpunk-teal">{events[currentTime]?.title}</h3>
                        <p className="text-sm text-muted-foreground">Time point {currentTime}</p>
                      </div>
                    </div>
                    
                    <p className="text-foreground mb-6">{events[currentTime]?.description}</p>
                    
                    <div className="mt-auto">
                      <h4 className="font-semibold mb-2 text-sm">Active Fluents:</h4>
                      <div className="space-y-2">
                        {events[currentTime]?.fluents.map((fluent, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyberpunk-teal"></div>
                            <p className="text-sm">{fluent}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full">
              <Card className="h-full border-cyberpunk-teal/30 bg-card/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-cyberpunk-teal mb-4">Situation at Time {currentTime}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Events So Far:</h4>
                      <div className="space-y-2">
                        {currentEvents.map((event, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-5 h-5 rounded-full bg-cyberpunk-teal/20 flex items-center justify-center mt-0.5">
                              <span className="text-xs text-cyberpunk-teal">{event.time}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{event.title}</p>
                              <p className="text-xs text-muted-foreground">{event.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-l border-muted pl-4">
                      <h4 className="font-semibold mb-2 text-sm">Current State (Fluents):</h4>
                      <div className="space-y-2">
                        {events[currentTime]?.fluents.map((fluent, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyberpunk-teal"></div>
                            <p className="text-sm">{fluent}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2 text-sm">Temporal Logic Expression:</h4>
                        <div className="p-3 rounded-lg bg-cyberpunk-dark-purple/50 border border-cyberpunk-teal/30 font-mono text-sm">
                          {currentTime > 0 ? (
                            <>HoldsAt(
                              {events[currentTime].fluents[0]}, {currentTime})<br />
                              ∧ Happens({events[currentTime].title}, {currentTime})
                            </>
                          ) : (
                            <>Initially(
                              {events[0].fluents[0]})<br />
                              ∧ Happens({events[0].title}, 0)
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal for event details - visible when an event is selected */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-lg p-6 w-full max-w-md shadow-xl"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-cyberpunk-teal mb-2">{selectedEvent.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">Time point {selectedEvent.time}</p>
              
              <p className="mb-6">{selectedEvent.description}</p>
              
              <div>
                <h4 className="font-semibold mb-2">Fluents at this time:</h4>
                <div className="space-y-2 mb-6">
                  {selectedEvent.fluents.map((fluent, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyberpunk-teal"></div>
                      <p>{fluent}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={() => setSelectedEvent(null)} variant="outline">Close</Button>
                {selectedEvent.time !== currentTime && (
                  <Button onClick={() => {
                    setCurrentTime(selectedEvent.time);
                    setSelectedEvent(null);
                  }} className="ml-2 bg-cyberpunk-teal">
                    Jump to this time
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TemporalTimelineVisual;
