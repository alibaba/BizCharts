/*
Components:
  Guide
  Guide.Line
  Guide.Image
  Guide.Text
  Guide.Region
  Guide.Arc
  Guide.Html
  Guide.RegionFilter
  Guide.DataMarker
  Guide.DataRegion
*/
import Base from '../Base';

const Guide = Base.generateBaseTypedComponent('Guide');


Guide.Line = Base.generateBaseTypedComponent('GuideLine');
Guide.Image = Base.generateBaseTypedComponent('GuideImage');
Guide.Text = Base.generateBaseTypedComponent('GuideText');
Guide.Region = Base.generateBaseTypedComponent('GuideRegion');
Guide.Html = Base.generateBaseTypedComponent('GuideHtml');
Guide.Arc = Base.generateBaseTypedComponent('GuideArc');
Guide.RegionFilter = Base.generateBaseTypedComponent('GuideRegionFilter');
Guide.DataMarker = Base.generateBaseTypedComponent('GuideDataMarker');
Guide.DataRegion = Base.generateBaseTypedComponent('GuideDataRegion');

export default Guide;
