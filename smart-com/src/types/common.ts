export type EntityById<TBase,TExtend = {}> = Omit<TBase, 'id'> & TExtend;

export type EntitiesById<TEntity> = Record<string, TEntity>;