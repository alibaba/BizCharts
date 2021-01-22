// 兼容, 4.2 后删除
import warn from  'warning';

// annotation G2暂不支持自定义组件。
import Arc from '../components/Annotation/arc';
import DataMarker from '../components/Annotation/dataMarker';
import DataRegion from '../components/Annotation/dataRegion';
// import Html from '../components/Annotation/html';
import Image from '../components/Annotation/image';
import Line from '../components/Annotation/line';
import Region from '../components/Annotation/region';
import Text from '../components/Annotation/text';

const Guide = (props) => {
  warn(false, 'Guide组件将在5.0后不再支持，请使用Annotation替代，请查看Annotation的使用文档');
  return props.children;
};

Guide.Arc = Arc;
Guide.DataMarker = DataMarker;
Guide.DataRegion = DataRegion;
// Guide.Html = Html;
Guide.Image = Image;
Guide.Line = Line;
Guide.Region = Region;
Guide.Text = Text;

export default Guide;
