import { ThumbsUp, MapPin, BadgeCheck } from "lucide-react";
import type { CommunityQuestion } from "@/lib/data";

export function CommunityCard({ question }: { question: CommunityQuestion }) {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-5 card-hover premium-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-full">
          <MapPin className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-primary">{question.location}</span>
        </div>
        {question.helpful && (
          <div className="flex items-center gap-1 bg-success/10 px-2.5 py-1 rounded-full">
            <BadgeCheck className="w-3 h-3 text-success" />
            <span className="text-xs font-medium text-success">Helpful</span>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-foreground text-sm leading-snug">{question.question}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{question.answer}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">{question.author[0]}</span>
          </div>
          <span className="text-xs text-muted-foreground">{question.author}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{question.date}</span>
        </div>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{question.upvotes}</span>
        </button>
      </div>
    </div>
  );
}
