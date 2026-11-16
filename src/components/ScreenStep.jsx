// Picks the right screen component for a step's `type`.
import ReferenceScreen from './screens/ReferenceScreen.jsx';
import PickRoleScreen from './screens/PickRoleScreen.jsx';
import FillPromptScreen from './screens/FillPromptScreen.jsx';
import TakeawaysScreen from './screens/TakeawaysScreen.jsx';

export default function ScreenStep({ step, completed, onComplete }) {
  switch (step.type) {
    case 'roles':
    case 'table': return <ReferenceScreen step={step} />;
    case 'pick': return <PickRoleScreen step={step} completed={completed} onComplete={onComplete} />;
    case 'fill': return <FillPromptScreen step={step} completed={completed} onComplete={onComplete} />;
    case 'takeaways': return <TakeawaysScreen step={step} />;
    default: return null;
  }
}
