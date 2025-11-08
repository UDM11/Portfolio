import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { timeline } from "@/constants";

const Experience = () => {
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
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:pr-[50%] md:pl-0" : "md:pl-[50%] md:pr-0"
                } pl-20`}
              >
                {/* Timeline Icon */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
                  {item.type === "education" ? (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-primary" />
                  )}
                </div>

                <Card className="border-none bg-card/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-primary font-medium mb-2">
                      {item.organization}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.period}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Experience;
