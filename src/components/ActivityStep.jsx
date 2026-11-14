// Picks the right activity component for a step's `type`.
import LessonPane from './LessonPane.jsx';
import ChatPane from './ChatPane.jsx';
import ChoiceActivity from './activities/ChoiceActivity.jsx';
import PlanActivity from './activities/PlanActivity.jsx';

export default function ActivityStep({ activity, completed, onComplete }) {
  switch (activity.type) {
    case 'sort':
    case 'roles':
      return <ChoiceActivity activity={activity} completed={completed} onComplete={onComplete} />;
    case 'scenario':
      return (
        <div className="panes">
          <LessonPane lesson={activity} />
          <ChatPane lesson={activity} onResult={(n) => { if (n === 4) onComplete(); }} />
        </div>
      );
    case 'plan':
      return <PlanActivity activity={activity} completed={completed} onComplete={onComplete} />;
    default:
      return null;
  }
}
