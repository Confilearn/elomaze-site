import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-foreground text-background pb-24 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight">Elomaze</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              Trusted homes, services & community insights across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Explore</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/properties" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Properties</Link>
              <Link to="/services" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Services</Link>
              <Link to="/community" className="text-sm opacity-60 hover:opacity-100 transition-opacity">Community</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="text-sm opacity-60 hover:opacity-100 transition-opacity">About</Link>
              <span className="text-sm opacity-60">Careers</span>
              <span className="text-sm opacity-60">Press</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4">Support</h4>
            <div className="flex flex-col gap-2.5">
              <span className="text-sm opacity-60">Help Center</span>
              <span className="text-sm opacity-60">Safety</span>
              <span className="text-sm opacity-60">Terms</span>
              <span className="text-sm opacity-60">Privacy</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-40">© 2026 Elomaze. All rights reserved.</p>
          <p className="text-sm opacity-40">Made with ❤️ for Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
