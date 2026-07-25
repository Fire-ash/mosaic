const metrics=[
["Exposure","--"],
["Pressure","--"],
["Overlap","--"],
["Diversification","--"]
];

export default function Metrics(){

return(

<footer className="h-24 border-t border-zinc-800 bg-[#0D1015] grid grid-cols-4">

{metrics.map(([title,value])=>(

<div
key={title}
className="border-r border-zinc-800 flex flex-col justify-center px-6">

<p className="text-xs uppercase text-zinc-500">
{title}
</p>

<p className="text-lg font-semibold">
{value}
</p>

</div>

))}

</footer>

)

}