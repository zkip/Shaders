/**
 * @type HTMLCanvasElement
 */
let canvas;
/**
 * @type WebGL2RenderingContext
 */
let gl;

{
    const drawers = [];
    const resizeCallbacks = [];

    async function init() {
        const stage = document.querySelector("#stage");
        canvas = document.createElement("canvas");

        stage.appendChild(canvas);

        function fitCanvas() {
            canvas.width = stage.offsetWidth;
            canvas.height = stage.offsetHeight;
        }
        function drawAllSources() {
            drawers.map((draw) => draw());
        }

        addEventListener("resize", () => {
            fitCanvas();
            drawAllSources();

            resizeCallbacks.map(callback => callback());
        });

        await shaderScripts();

        fitCanvas();
        drawAllSources();
    }

    async function shaderScripts() {
        const meta = regist(await fetchMeta());
        const tasks = meta.map(async (name) => regist(await import(`/shaders/${name}.js`)));
        await Promise.all(tasks);
    }

    function regist(exports = {}) {
        for (const [name, exported] of Object.entries(exports)) {
            if (name === 'draw') {
                drawers.push(exported);
            }
            if (name === 'onResize') {
                resizeCallbacks.push(exported);
            }
        }
        return exports;
    }

    async function fetchMeta(){
        const resp = await fetch("meta.json");
        return resp.json();
    }

    addEventListener("load", init);
}

function createProgram(){}
function createProgram(){}