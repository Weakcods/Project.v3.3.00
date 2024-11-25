import { Shield, Users,  Zap, Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '../Aboutcardsection';

export default function AboutSection() {
  const stats = [
    { number: "1000+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Zap className="w-6 h-6" /> },
    { number: "24/7", label: "Support", icon: <Shield className="w-6 h-6" /> }
  ];

  const teamMembers = [
    {
      name: "Jasper Brix Olpos",
      role: "Pancit canton/kape",
      image: "/Public/images/jas.jpg",
      bio: "10+ years in sa Pilipinas, madami Chix",
      social: {
        facebook: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Reymart Azucena",
      role: "Debugger/Consultant",
      image: "/Public/images/mart.jpg",
      bio: "Former chief of campus security",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Noe Dela Cruz",
      role: "Researcher",
      image: "/Public/images/noe.jpg",
      bio: "Specialist in user-centered design",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    },
    {
      name: "Joshua Bacay",
      role: "Lead Developer/UI/UX Designer",
      image: "/Public/images/me.jpg",
      bio: "Full-stack developer & security expert",
      social: {
        instagram: "#",
        twitter: "#",
        facebook: "#"
      }
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-6 sm:mb-8"
        >
          Meet Our Team
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          We're dedicated to making campus access control simple, secure, and efficient. Our digital gate pass system 
          revolutionizes how educational institutions manage their security and access control.
        </motion.p>

        {/* Team Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden rounded-t-xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-2 sm:mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex space-x-4">
                  {member.social.facebook && (
                    <a 
                      href={member.social.facebook} 
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={`${member.name}'s Facebook`}
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a 
                      href={member.social.instagram} 
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a 
                      href={member.social.twitter} 
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              number={stat.number}
              label={stat.label}
              icon={stat.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
