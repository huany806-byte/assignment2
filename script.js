// Fictional sample data: each object is one browser tab (40 rows total).
const counts = [
  ['Bilibili','Entertainment',24],
  ['Canvas','School / Work',3],
  ['Google Docs','School / Work',2],
  ['The New School Student Portal','School / Work',1],
  ['Google Drive','School / Work',2],
  ['Million Notes','School / Work',1],
  ['Amazon','Shopping',3],
  ['App Store','Research / Tools',1],
  ['Google Search','Research / Tools',3]
];
const tabs = counts.flatMap(([website,category,count]) => Array.from({length:count},(_,i)=>({id:`tab-${website.replaceAll(' ','-')}-${i+1}`,website,category})));
const categoryColors={'Entertainment':'#e6a0c4','School / Work':'#a99bea','Shopping':'#f4cc79','Research / Tools':'#8bcac3'};
const websiteColors=['#e6a0c4','#a99bea','#c4b8f3','#d9cff7','#8b7acb','#b5a7e4','#f4cc79','#8bcac3','#b2ded9'];
const viewEl=document.querySelector('#view'),typeEl=document.querySelector('#type');
let chart;
function draw(){
  const byWebsite=viewEl.value==='website';
  const labels=byWebsite?counts.map(x=>x[0]):Object.keys(categoryColors);
  const values=labels.map(label=>tabs.filter(t=>(byWebsite?t.website:t.category)===label).length);
  const colors=byWebsite?websiteColors:labels.map(x=>categoryColors[x]);
  if(chart)chart.destroy();
  const bar=typeEl.value==='bar';
  chart=new Chart(document.querySelector('#tabsChart'),{
    type:typeEl.value,
    data:{labels,datasets:[{label:'Open tabs',data:values,backgroundColor:colors,borderColor:'#fff',borderWidth:bar?0:4,borderRadius:bar?7:0,hoverOffset:bar?0:12}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:bar?undefined:'61%',plugins:{legend:{display:!bar,position:'bottom',labels:{usePointStyle:true,padding:17,font:{family:'DM Sans',size:11}}},title:{display:true,text:byWebsite?'Tabs by website':'Tabs by category',font:{family:'Space Grotesk',size:15},color:'#554760',padding:{bottom:15}},tooltip:{callbacks:{label:context=>`${context.label}: ${context.parsed?.y ?? context.parsed} tabs`}}},scales:bar?{y:{beginAtZero:true,ticks:{precision:0},grid:{color:'#f0eaf3'}},x:{grid:{display:false},ticks:{maxRotation:45,minRotation:0,font:{size:10}}}}:{}}
  });
  document.querySelector('#chartNote').textContent=byWebsite?'These are the individual websites behind my open tabs.':'Hover over a slice to see the number of tabs.';
}
viewEl.addEventListener('change',draw);typeEl.addEventListener('change',draw);draw();
