// Some random colors
const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

const numBalls = 50;
const balls = [];

for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement("div");
  ball.classList.add("ball");
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;
  
  balls.push(ball);
  document.body.append(ball);
}

// Keyframes
balls.forEach((el, i, ra) => {
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: "translate(0, 0)" },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "ease-in-out"
    }
  );
});



async function fetchgreed() {
    try {
    const output = await (
        fetch("https://fear-and-greed-index.p.rapidapi.com/v1/fgi", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
                "x-rapidapi-key": "ba6f93db03mshd84c680f5955961p1a7394jsn2cbfb7f22023"
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        })

      )

      //console.log(output["fgi"]["now"]["value"]);
      //console.log(output["fgi"]["now"]["valueText"]);

                                    //console.log(document.getElementById('fearvaltext').innerText);
                                    //console.log(document.getElementById('fearval').innerText);

      //document.getElementById('fearvaltext').innerHTML = output["fgi"]["now"]["valueText"]


      const elem = document.querySelector('#fearvaltext');

      elem.textContent = output["fgi"]["now"]["valueText"]
     // document.getElementById('fearval').textContent = output["fgi"]["now"]["value"]

    }
    catch (error) {
        console.log("Error", error)
      }
};
