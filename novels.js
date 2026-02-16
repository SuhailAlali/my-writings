fetch("novels.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("novels-container");
    
    data.forEach(novel => {
      const box = document.createElement("div");
      box.className = "sec";
      box.style.cursor = "pointer";
      
      let showingInfo = false;
      let showingSoon = false;
      
      const frontView = `
        <img src="${novel["casing-path"]}" style="width:100%;border-radius:8px;margin-bottom:10px;">
        <h3 style="font-family: MyFonty; font-size:25px;">${novel.name}</h3>
      `;
      
      const infoView = `
        <h3 style="font-family: MyFonty; font-size:26px;">${novel.name}</h3>
        <p style="color:#aaa;font-size:13px;">${novel.data}</p>
        <p style="color:#ddd;font-size:14px;">${novel.description}</p>
        <p style="color:#bbb;font-size:13px;"> ${novel.category}</p>
      `;
      
      const soonView = `
        <h3 style="font-family: MyFonty; font-size:28px;">${novel.name}</h3>
        <p style="color:#f5caca;font-size:16px;">قريباً...</p>
      `;
      
      box.innerHTML = frontView;
      
      // نقرة واحدة
      box.addEventListener("click", () => {
        if (showingSoon) {
          box.innerHTML = frontView;
          showingSoon = false;
          showingInfo = false;
          return;
        }
        
        if (!showingInfo) {
          box.innerHTML = infoView;
          showingInfo = true;
        } else {
          box.innerHTML = frontView;
          showingInfo = false;
        }
      });
      
      // نقرتين
      box.addEventListener("dblclick", () => {
        if (novel["pdf-path"]) {
          window.open(novel["pdf-path"], "_blank");
        } else {
          box.innerHTML = soonView;
          showingSoon = true;
        }
      });
      
      container.appendChild(box);
    });
  });