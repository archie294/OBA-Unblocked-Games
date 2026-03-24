import { useState } from 'react';
import { Gamepad2, X, Maximize2, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gamesData from './games.json';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = gamesData.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 selection:text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.3)]">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">
              UNBLOCKED<span className="text-purple-500">GAMES</span>
            </h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium text-white/60">
            <button className="hover:text-white transition-colors cursor-pointer">Popular</button>
            <button className="hover:text-white transition-colors cursor-pointer">New</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-12 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-purple-900/20 to-transparent opacity-50 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter">
            PLAY WITHOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">LIMITS</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            Access your favorite games anywhere. No blocks, no filters, just pure fun.
          </p>
        </motion.div>
      </header>

      {/* Games Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedGame(game)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:border-purple-500/50 transition-all shadow-xl">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{game.title}</h3>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-purple-600 p-2 rounded-lg shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/40 text-xl">No games found matching your search.</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-6xl bg-[#111] rounded-3xl overflow-hidden border border-white/10 flex flex-col shadow-2xl shadow-purple-500/10"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-lg">{selectedGame.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 bg-black relative">
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>
              <div className="p-4 bg-white/5 flex items-center justify-between text-sm text-white/40">
                <p>Playing: {selectedGame.title}</p>
                <div className="flex gap-4">
                  <button className="hover:text-white transition-colors">Report Issue</button>
                  <button className="hover:text-white transition-colors">Full Screen</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2 opacity-50">
            <Gamepad2 className="w-5 h-5" />
            <span className="font-bold">UNBLOCKEDGAMES</span>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
          <p className="text-sm text-white/20">© 2026 Unblocked Games Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
