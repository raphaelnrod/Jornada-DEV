var pararExec;

function desenharTanques(liquidColor, liquidBackgroundColor, percent, elementId) {
  this.fluid = this.fluidMeter();
  var opcoes = {
    targetContainer: document.getElementById(elementId),
    fillPercentage: percent,
    options: {
      width: 120,
      height: 120,
      fontFamily: "Roboto",
      fontSize: "25px",
      drawPercentageSign: true,
      drawBubbles: false,
      size: 120,
      borderWidth: 6,
      backgroundColor: "#e2e2e2",
      foregroundColor: "#fafafa",
      foregroundFluidLayer: {
        fillStyle: liquidColor,
        angularSpeed: 30,
        maxAmplitude: 7,
        frequency: 30,
        horizontalSpeed: -20,
      },
      backgroundFluidLayer: {
        fillStyle: liquidBackgroundColor,
        angularSpeed: 100,
        maxAmplitude: 5,
        frequency: 22,
        horizontalSpeed: 20,
      },
    },
  };
  this.fluid.init(opcoes);
}

/**
 * Funcao que desenha o liquido
 * Author: Raphael Augusto
 */
function fluidMeter() {
  var context;
  var targetContainer;
  var requestId;

  var time = null;
  var dt = null;

  var options = {
    drawShadow: true,
    drawText: true,
    drawPercentageSign: true,
    drawBubbles: false,
    fontSize: "70px",
    fontFamily: "Arial",
    fontFillStyle: "white",
    size: 300,
    width: 300,
    height: 300,
    borderWidth: 25,
    backgroundColor: "#e2e2e2",
    foregroundColor: "#fafafa",
  };

  var currentFillPercentage = 0;
  var fillPercentage = 0;

  //#region fluid context values
  var foregroundFluidLayer = {
    fillStyle: "purple",
    angle: 0,
    horizontalPosition: 0,
    angularSpeed: 0,
    maxAmplitude: 9,
    frequency: 30,
    horizontalSpeed: -150,
    initialHeight: 0,
  };

  var backgroundFluidLayer = {
    fillStyle: "pink",
    angle: 0,
    horizontalPosition: 0,
    angularSpeed: 140,
    maxAmplitude: 12,
    frequency: 40,
    horizontalSpeed: 150,
    initialHeight: 0,
  };

  /**
   * initializes and mount the canvas element on the document
   */
  var setupCanvas = () => {
    var canvas = document.createElement("canvas");
    canvas.width = options.size;
    canvas.height = options.size;
    canvas.id = "desenho-tanque";
    context = canvas.getContext("2d");
    targetContainer.appendChild(canvas);

    // shadow is not required  to be on the draw loop
    //#region shadow
    if (options.drawShadow) {
      context.save();
      context.beginPath();
      context.filter = "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))";
      context.arc(
        options.size / 2,
        options.size / 2,
        getMeterRadius() / 2,
        0,
        2 * Math.PI
      );
      context.closePath();
      context.fill();
      context.restore();
    }
  };

  /**
   * draw cycle
   */
  var draw = () => {
    requestId = undefined;
    var now = new Date().getTime();
    dt = (now - (time || now)) / 700;
    time = now;
    context.clearRect(0, 0, options.width, options.height);
    drawMeterBackground();
    drawFluid(dt);
    if (options.drawText) {
      drawText();
    }
    drawMeterForeground();
    start();
  };

  var start = () => {
    if (pararExec) {
      stop();
      return false;
    } else if (!requestId) {
      requestId = window.requestAnimationFrame(draw);
    }
  };

  var stop = () => {
    if (requestId) {
      window.cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  };

  var drawMeterBackground = () => {
    context.save();
    context.fillStyle = options.backgroundColor;
    context.beginPath();
    context.arc(
      options.size / 2,
      options.size / 2,
      getMeterRadius() / 2 - options.borderWidth,
      0,
      2 * Math.PI
    );
    context.closePath();
    context.fill();
    context.restore();
  };

  var drawMeterForeground = () => {
    context.save();
    context.lineWidth = options.borderWidth;
    context.strokeStyle = options.foregroundColor;
    context.beginPath();
    context.arc(
      options.size / 2,
      options.size / 2,
      getMeterRadius() / 2 - options.borderWidth / 2,
      0,
      2 * Math.PI
    );
    context.closePath();
    context.stroke();
    context.restore();
  };
  /**
   * draws the fluid contents of the meter
   * @param  {} dt elapsed time since last frame
   */
  var drawFluid = (dt) => {
    context.save();
    context.arc(
      options.size / 2,
      options.size / 2,
      getMeterRadius() / 2 - options.borderWidth,
      0,
      Math.PI * 2
    );
    context.clip();
    drawFluidLayer(backgroundFluidLayer, dt);
    drawFluidLayer(foregroundFluidLayer, dt);
    context.restore();
  };

  /**
   * draws the foreground fluid layer
   * @param  {} dt elapsed time since last frame
   */
  var drawFluidLayer = (layer, dt) => {
    // calculate wave angle
    if (layer.angularSpeed > 0) {
      layer.angle += layer.angularSpeed * dt;
      layer.angle = layer.angle < 0 ? layer.angle + 360 : layer.angle;
    }

    // calculate horizontal position
    layer.horizontalPosition += layer.horizontalSpeed * dt;
    if (layer.horizontalSpeed > 0) {
      layer.horizontalPosition > Math.pow(2, 53) ? 0 : layer.horizontalPosition;
    } else if (layer.horizontalPosition < 0) {
      layer.horizontalPosition < -1 * Math.pow(2, 53)
        ? 0
        : layer.horizontalPosition;
    }

    var x = 0;
    var y = 0;
    var amplitude =
      layer.maxAmplitude * Math.sin((layer.angle * Math.PI) / 180);

    var meterBottom =
      options.size -
      (options.size - getMeterRadius()) / 2 -
      options.borderWidth;
    var fluidAmount =
      (currentFillPercentage * (getMeterRadius() - options.borderWidth * 2)) /
      100;

    if (currentFillPercentage < fillPercentage) {
      currentFillPercentage += 15 * dt;
    } else if (currentFillPercentage > fillPercentage) {
      currentFillPercentage -= 15 * dt;
    }

    layer.initialHeight = meterBottom - fluidAmount;

    context.save();
    context.beginPath();

    context.lineTo(0, layer.initialHeight);

    while (x < options.size) {
      y =
        layer.initialHeight +
        amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
      context.lineTo(x, y);
      x++;
    }

    context.lineTo(x, options.size);
    context.lineTo(0, options.size);
    context.closePath();

    context.fillStyle = layer.fillStyle;
    context.fill();
    context.restore();
  };

  var drawText = () => {
    var text = options.drawPercentageSign
      ? currentFillPercentage.toFixed(0) + "%"
      : currentFillPercentage.toFixed(0);

    context.save();
    context.font = getFontSize();
    context.fillStyle = options.fontFillStyle;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.filter = "drop-shadow(0px 0px 5px rgba(0,0,0,0.7))";
    context.fillText(text, options.size / 2, options.size / 2);
    context.restore();
  };

  //#region helper methods
  var clamp = function (number, min, max) {
    return Math.min(Math.max(number, min), max);
  };
  var getMeterRadius = () => {
    return options.size * 0.9;
  };

  var getFontSize = () => {
    return options.fontSize + " " + options.fontFamily;
  };

  return {
    init: (env) => {
      if (!env.targetContainer) throw "empty or invalid container";

      targetContainer = env.targetContainer;
      fillPercentage = clamp(env.fillPercentage, -100, 100);

      if (env.options) {
        options.drawShadow = env.options.drawShadow === false ? false : true;
        options.size = env.options.size;
        options.borderWidth = env.options.borderWidth || options.borderWidth;
        options.foregroundColor =
          env.options.foregroundFluidColor || options.foregroundColor;
        options.backgroundColor =
          env.options.backgroundFluidColor || options.backgroundColor;
        options.backgroundColor =
          env.options.backgroundColor || options.backgroundColor;
        options.foregroundColor =
          env.options.foregroundColor || options.foregroundColor;

        options.drawText = env.options.drawText === false ? false : true;
        options.drawPercentageSign =
          env.options.drawPercentageSign === false ? false : true;
        options.fontSize = env.options.fontSize || options.fontSize;
        options.fontFamily = env.options.fontFamily || options.fontFamily;
        options.fontFillStyle =
          env.options.fontFillStyle || options.fontFillStyle;
        // fluid settings

        if (env.options.foregroundFluidLayer) {
          foregroundFluidLayer.fillStyle =
            env.options.foregroundFluidLayer.fillStyle ||
            foregroundFluidLayer.fillStyle;
          foregroundFluidLayer.angularSpeed =
            env.options.foregroundFluidLayer.angularSpeed ||
            foregroundFluidLayer.angularSpeed;
          foregroundFluidLayer.maxAmplitude =
            env.options.foregroundFluidLayer.maxAmplitude ||
            foregroundFluidLayer.maxAmplitude;
          foregroundFluidLayer.frequency =
            env.options.foregroundFluidLayer.frequency ||
            foregroundFluidLayer.frequency;
          foregroundFluidLayer.horizontalSpeed =
            env.options.foregroundFluidLayer.horizontalSpeed ||
            foregroundFluidLayer.horizontalSpeed;
        }

        if (env.options.backgroundFluidLayer) {
          backgroundFluidLayer.fillStyle =
            env.options.backgroundFluidLayer.fillStyle ||
            backgroundFluidLayer.fillStyle;
          backgroundFluidLayer.angularSpeed =
            env.options.backgroundFluidLayer.angularSpeed ||
            backgroundFluidLayer.angularSpeed;
          backgroundFluidLayer.maxAmplitude =
            env.options.backgroundFluidLayer.maxAmplitude ||
            backgroundFluidLayer.maxAmplitude;
          backgroundFluidLayer.frequency =
            env.options.backgroundFluidLayer.frequency ||
            backgroundFluidLayer.frequency;
          backgroundFluidLayer.horizontalSpeed =
            env.options.backgroundFluidLayer.horizontalSpeed ||
            backgroundFluidLayer.horizontalSpeed;
        }
      }
      setupCanvas();
      start();
    },
  };
}
