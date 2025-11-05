const StockSparkline = ({
  data
}) => {
  if (!data || data.length === 0) return null;
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  const points = data.map((d, i) => {
    const x = i / (data.length - 1) * 100;
    const y = 100 - (d.value - min) / range * 100;
    return `${x},${y}`;
  }).join(" ");
  const isPositive = data[data.length - 1].value > data[0].value;
  return <div className="space-y-2">
      <svg viewBox="0 0 100 30" className="w-full h-16" preserveAspectRatio="none">
        <polyline fill="none" stroke={isPositive ? "hsl(142 76% 36%)" : "hsl(0 84% 60%)"} strokeWidth="2" points={points} />
        <polyline fill={isPositive ? "url(#gradient-positive)" : "url(#gradient-negative)"} points={`0,100 ${points} 100,100`} opacity="0.2" />
        <defs>
          <linearGradient id="gradient-positive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(142 76% 36%)" />
            <stop offset="100%" stopColor="hsl(142 76% 36%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="gradient-negative" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(0 84% 60%)" />
            <stop offset="100%" stopColor="hsl(0 84% 60%)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{data[0].date}</span>
        <span className={isPositive ? "text-success" : "text-destructive"}>
          {isPositive ? "+" : ""}
          {((data[data.length - 1].value - data[0].value) / data[0].value * 100).toFixed(1)}%
        </span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>;
};
export default StockSparkline;