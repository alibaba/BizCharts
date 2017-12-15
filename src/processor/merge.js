
// import interfaceEs6 from 'interface-es6';

const iMerge = {
  merge(config, nextConfig, clear) {
    this.mergeAxises(config, nextConfig, clear);
    this.mergeCoord(config, nextConfig, clear);
    this.mergeGeoms(config, nextConfig, clear);
    this.mergeLegends(config, nextConfig, clear);
    this.mergeTooltip(config, nextConfig, clear);
  },

  mergeAxises(config, nextConfig, clear) {
    const axises = config.axises;
    const nextAxises = nextConfig.axises;

    if (axises == null && nextAxises == null) {
      return;
    }

    for (const id in axises) {
      if (Object.prototype.hasOwnProperty.call(axises, id)
        && Object.prototype.hasOwnProperty.call(nextAxises, id)
      ) {
        if (!clear) {
          nextAxises[id].g2Instance = axises[id].g2Instance;
        }
        axises[id] = nextAxises[id];
      }
    }

    return;
  },

  mergeTooltip(config, nextConfig, clear) {
    if (config.tooltip && nextConfig.tooltip) {
      if (!clear) {
        nextConfig.tooltip.g2Instance = config.tooltip.g2Instance;
      }
      config.tooltip = nextConfig.tooltip;
    }
  },

  mergeCoord(config, nextConfig, clear) {
    if (config.coord && nextConfig.coord) {
      if (!clear) {
        nextConfig.coord.g2Instance = config.coord.g2Instance;
      }
      config.coord = nextConfig.coord;
    }
  },

  mergeLegends(legends, nextLegends, clear) {
    if (legends == null && nextLegends == null) {
      return;
    }

    for (const id in legends) {
      if (Object.prototype.hasOwnProperty.call(legends, id)
      && Object.prototype.hasOwnProperty.call(nextLegends, id)
      ) {
        if (!clear) {
          nextLegends[id].g2Instance = legends[id].g2Instance;
        }
        legends[id] = nextLegends[id];
      }
    }
  },

  mergeGeoms(geoms, nextGeoms, clear) {
    if (geoms == null && nextGeoms == null) {
      return false;
    }

    for (const id in geoms) {
      if (Object.prototype.hasOwnProperty.call(geoms, id)
      && Object.prototype.hasOwnProperty.call(nextGeoms, id)) {
        if (!clear) {
          nextGeoms[id].g2Instance = geoms[id].g2Instance;
        }
        geoms[id] = nextGeoms[id];
      }
    }

    return false;
  },

};

export default iMerge;
