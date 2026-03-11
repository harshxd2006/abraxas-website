import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual form submission logic
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  return (
    <div className="bg-black py-16 px-4 md:px-8 overflow-x-hidden">
      <motion.div
        ref={ref}
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Header */}
        <motion.h1
          style={{ fontFamily: "'Syne', sans-serif" }}
          className="text-3xl md:text-4xl font-bold text-white mb-3 text-center tracking-widest"
          variants={itemVariants}
        >
          CONTACT
        </motion.h1>
        <motion.div className="w-12 h-px bg-white/20 mx-auto mb-4" variants={itemVariants} />
        <motion.p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-center text-white/40 text-base mb-12 font-light"
          variants={itemVariants}
        >
          Got a question or want to collaborate? We'd love to hear from you.
        </motion.p>

        {submitted ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Send className="w-6 h-6 text-white/60" />
            </div>
            <h2 style={{ fontFamily: "'Syne', sans-serif" }} className="text-2xl font-bold text-white mb-3">
              Message Sent!
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-white/40 text-sm">
              We'll get back to you as soon as possible.
            </p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Name */}
            <div>
              <label
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="block text-white/40 text-xs uppercase tracking-widest mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="block text-white/40 text-xs uppercase tracking-widest mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200"
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="block text-white/40 text-xs uppercase tracking-widest mb-2"
              >
                Message
              </label>
              <textarea
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                rows={5}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200 resize-none"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 hover:bg-white/15 text-white text-sm font-medium rounded-lg transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              Send Message
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default Contact;