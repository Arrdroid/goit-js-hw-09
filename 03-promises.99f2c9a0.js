function e(e,t){return new Promise(((o,n)=>{const s=Math.random()>.3;setTimeout((()=>{s?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(function(t){t.preventDefault();const o=new FormData(t.target),n=parseInt(o.get("delay")),s=parseInt(o.get("step")),i=parseInt(o.get("amount"));if(n<0||s<0||i<=0)alert("Please fill the areas with valid numbers!");else for(let t=0;t<i;t+=1){e(t+1,n+t*s).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}))}}));
//# sourceMappingURL=03-promises.99f2c9a0.js.map
