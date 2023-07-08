from typing import Dict, TypeVar

T = TypeVar('T')


class CaseInsensitiveDict(Dict[str, T]):
    __dict: Dict

    def __getitem__(self, key: str) -> T:
        return dict.__getitem__(self, key.casefold())

    def __setitem__(self, key: str, value: T) -> None:
        dict.__setitem__(self, key.casefold(), value)

    def __delitem__(self, key) -> None:
        dict.__delitem__(self, key.casefold())
