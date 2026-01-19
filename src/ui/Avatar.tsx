interface AvatarProps {
  profilePicture: string | null;
  name: string | null;
}

export const Avatar = (props: AvatarProps) => (
  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
    {props.profilePicture ? (
      <img
        src={props.profilePicture}
        alt={props.name ?? 'User'}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-white bg-brand-500">
        {props.name?.charAt(0).toUpperCase() || 'U'}
      </div>
    )}
  </div>
);
