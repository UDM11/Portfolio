import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { highlights } from "@/constants";
import profileImg from "@/assets/profile.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="py-20 bg-muted/30 pt-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about my journey, education, and passion for technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl animate-glow" />
              <div className="absolute inset-2 bg-background rounded-3xl overflow-hidden">
                <img
                  src={profileImg}
                  alt="Umesh Darlami"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Hi, I'm Umesh Darlami
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a passionate full-stack developer and BCSIT student at Liberty College. 
                My journey in technology started with a curiosity about how things work behind 
                the screen, and it has evolved into a deep passion for creating meaningful digital experiences.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in building modern web applications using cutting-edge technologies. 
                My goal is to combine technical expertise with creative problem-solving to deliver 
                solutions that make a real impact.
              </p>
            </div>

            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-none bg-card/50 backdrop-blur hover:bg-card-hover transition-colors">
                    <CardContent className="p-4 flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <item.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
