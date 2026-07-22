import { LiveProvider, LiveEditor, LivePreview, LiveError } from 'react-live';
import { themes } from 'prism-react-renderer';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Fab } from '../Fab/Fab';
import { Badge } from '../Badge/Badge';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { Switch } from '../Switch/Switch';
import { Icon } from '@theya/icons';
import styles from './LivePlayground.module.css';

/**
 * Everything available to type in the editor without an import
 * statement — every Theya component plus the Icon renderer and React's
 * useState (the most common thing needed for a working demo).
 */
const scope = {
  Button,
  IconButton,
  Fab,
  Badge,
  Checkbox,
  Radio,
  Switch,
  Icon,
};

export interface LivePlaygroundProps {
  /** Starting code shown in the editor. */
  code?: string;
}

const DEFAULT_CODE = `<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Button intent="primary" leftIcon={<Icon name="star" size={16} />}>
    Click me
  </Button>
  <Badge variant="qty" intent="success" count="3" />
  <Checkbox label="Check me" defaultChecked />
</div>`;

export function LivePlayground({ code = DEFAULT_CODE }: LivePlaygroundProps) {
  return (
    <LiveProvider code={code} scope={scope} theme={themes.vsDark} noInline={false}>
      <div className={styles.layout}>
        <div className={styles.editorPane}>
          <div className={styles.paneLabel}>Code</div>
          <LiveEditor className={styles.editor} />
          <LiveError className={styles.error} />
        </div>
        <div className={styles.previewPane}>
          <div className={styles.paneLabel}>Preview</div>
          <div className={styles.previewSurface}>
            <LivePreview />
          </div>
        </div>
      </div>
    </LiveProvider>
  );
}
