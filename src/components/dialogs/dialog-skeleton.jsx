

export const DialogSkeleton = ({ children , title , footer , className }) => {
  return (
    <div className={`${className} flex flex-col bg-white rounded`}>
      <div className={'px-4 py-2.5 border-b border-gray-100'}>
        <div className={'text-[16px] font-semibold'}>{title}</div>
      </div>

      <div className={'flex-1 flex'}>
        {children}
      </div>

      <div>
        {footer}
      </div>
    </div>
  )
}