(module
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $none_=>_none (func))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_i32_i32_i32_=>_i32 (func (param i32 i32 i32 i32) (result i32)))
 (type $i32_i64_i64_=>_i32 (func (param i32 i64 i64) (result i32)))
 (type $i64_=>_i64 (func (param i64) (result i64)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "seal0" "seal_input" (func $assembly/seal/seal0/seal_input (param i32 i32)))
 (import "seal0" "seal_hash_sha2_256" (func $assembly/seal/seal0/seal_hash_sha2_256 (param i32 i32 i32)))
 (import "seal0" "seal_set_storage" (func $assembly/seal/seal0/seal_set_storage (param i32 i32 i32)))
 (import "seal0" "seal_get_storage" (func $assembly/seal/seal0/seal_get_storage (param i32 i32 i32) (result i32)))
 (import "seal0" "seal_return" (func $assembly/seal/seal0/seal_return (param i32 i32 i32)))
 (import "seal0" "seal_value_transferred" (func $assembly/seal/seal0/seal_value_transferred (param i32 i32)))
 (memory $0 1)
 (data (i32.const 12) "(\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00(\00\00\00a\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e\00")
 (data (i32.const 76) "\1e\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00p\00u\00r\00e\00.\00t\00s\00")
 (data (i32.const 140) "\1e\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s\00")
 (data (i32.const 204) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\000\00")
 (data (i32.const 236) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\001\00")
 (data (i32.const 268) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\002\00")
 (data (i32.const 300) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\003\00")
 (data (i32.const 332) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\004\00")
 (data (i32.const 364) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\005\00")
 (data (i32.const 396) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\006\00")
 (data (i32.const 428) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\007\00")
 (data (i32.const 460) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\008\00")
 (data (i32.const 492) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\009\00")
 (data (i32.const 524) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00a\00")
 (data (i32.const 556) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00b\00")
 (data (i32.const 588) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00c\00")
 (data (i32.const 620) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00d\00")
 (data (i32.const 652) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00e\00")
 (data (i32.const 684) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00f\00")
 (data (i32.const 716) "@\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00@\00\00\00\e0\00\00\00\00\01\00\00 \01\00\00@\01\00\00`\01\00\00\80\01\00\00\a0\01\00\00\c0\01\00\00\e0\01\00\00\00\02\00\00 \02\00\00@\02\00\00`\02\00\00\80\02\00\00\a0\02\00\00\c0\02\00\00")
 (data (i32.const 812) "\10\00\00\00\01\00\00\00\00\00\00\00\03\00\00\00\10\00\00\00\e0\02\00\00\e0\02\00\00@\00\00\00\10\00\00\00")
 (data (i32.const 860) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\d1\83Q+")
 (data (i32.const 892) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00j7\12\e2")
 (data (i32.const 924) "\1c\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h\00")
 (data (i32.const 972) "&\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s\00")
 (data (i32.const 1036) "$\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e\00")
 (data (i32.const 1100) "$\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s\00")
 (data (i32.const 1164) "\1a\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s\00")
 (data (i32.const 1212) "\1e\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00u\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00n\00u\00l\00l\00")
 (data (i32.const 1276) "0\00\00\00\01\00\00\00\00\00\00\00\01\00\00\000\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00b\00u\00i\00l\00d\00i\00n\00s\00/\00M\00s\00g\00.\00t\00s\00")
 (data (i32.const 1356) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1388) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1420) "B\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00B\00\00\00B\00o\00o\00l\00:\00 \00C\00a\00n\00n\00o\00t\00 \00d\00e\00c\00o\00d\00e\00 \00i\00n\00v\00a\00l\00i\00d\00 \00i\00n\00p\00u\00t\00")
 (data (i32.const 1516) "H\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00H\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00d\00e\00p\00s\00/\00a\00s\00-\00s\00c\00a\00l\00e\00-\00c\00o\00d\00e\00c\00/\00B\00o\00o\00l\00.\00t\00s\00")
 (data (i32.const 1612) "\18\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\18\00\00\00f\00l\00i\00p\00p\00e\00r\00.\00f\00l\00a\00g\00")
 (data (i32.const 1660) "6\00\00\00\01\00\00\00\00\00\00\00\01\00\00\006\00\00\00e\00x\00a\00m\00p\00l\00e\00s\00/\00f\00l\00i\00p\00p\00e\00r\00/\00f\00l\00i\00p\00p\00e\00r\00.\00t\00s\00")
 (data (i32.const 1740) "\08\00\00\00\01\00\00\00\00\00\00\00\1a\00\00\00\08\00\00\00\01\00\00\00\00\00\00\00")
 (data (i32.const 1772) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1804) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\c0\96\a5\f8")
 (data (i32.const 1836) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\1e\\\a4V")
 (data (i32.const 1868) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\fe\dc\03\f6")
 (data (i32.const 1900) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\fc<M\f7")
 (data (i32.const 1932) "\08\00\00\00\01\00\00\00\00\00\00\00\1b\00\00\00\08\00\00\00\02\00\00\00\00\00\00\00")
 (data (i32.const 1964) "L\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00L\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00i\00n\00p\00u\00t\00:\00 \00B\00y\00t\00e\00 \00a\00r\00r\00a\00y\00 \00s\00h\00o\00u\00l\00d\00 \00b\00e\00 \001\006\00")
 (data (i32.const 2060) "Z\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00Z\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00d\00e\00p\00s\00/\00a\00s\00-\00s\00c\00a\00l\00e\00-\00c\00o\00d\00e\00c\00/\00/\00U\00I\00n\00t\00/\00U\00I\00n\00t\001\002\008\00.\00t\00s\00")
 (data (i32.const 2172) "<\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00<\00\00\00~\00l\00i\00b\00/\00a\00s\00-\00b\00i\00g\00n\00u\00m\00/\00i\00n\00t\00e\00g\00e\00r\00/\00u\001\002\008\00.\00t\00s\00")
 (data (i32.const 2252) "(\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00(\00\00\00C\00a\00n\00 \00n\00o\00t\00 \00a\00c\00c\00e\00p\00t\00 \00v\00a\00l\00u\00e\00")
 (data (i32.const 2320) "\1f\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00\"A\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00b\00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\n\00\00\00 \00\00\00\00\00\00\00\"\t\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\10\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00a\00\00\00\02\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\10\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00 \00\00\00\00\00\00\00")
 (table $0 3 funcref)
 (elem (i32.const 1) $assembly/seal/seal0/seal_hash_sha2_256 $assembly/seal/seal0/seal_value_transferred)
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/ASC_LOW_MEMORY_LIMIT i32 (i32.const 0))
 (global $~lib/ASC_SHRINK_LEVEL i32 (i32.const 0))
 (global $assembly/primitives/alias/ReturnCode.Success i32 (i32.const 0))
 (global $assembly/primitives/alias/ReturnCode.CalleeTrapped i32 (i32.const 1))
 (global $assembly/primitives/alias/ReturnCode.CalleeReverted i32 (i32.const 2))
 (global $assembly/primitives/alias/ReturnCode.KeyNotFound i32 (i32.const 3))
 (global $assembly/primitives/alias/ReturnCode.BelowSubsistenceThreshold i32 (i32.const 4))
 (global $assembly/primitives/alias/ReturnCode.TransferFailed i32 (i32.const 5))
 (global $assembly/primitives/alias/ReturnCode.NewContractNotFunded i32 (i32.const 6))
 (global $assembly/primitives/alias/ReturnCode.CodeNotFound i32 (i32.const 7))
 (global $assembly/primitives/alias/ReturnCode.NotCallable i32 (i32.const 8))
 (global $assembly/utils/Log/HexChar i32 (i32.const 832))
 (global $assembly/utils/Log/Log (mut i32) (i32.const 0))
 (global $examples/flipper/flipper/msg (mut i32) (i32.const 0))
 (global $~lib/builtins/i32.MAX_VALUE i32 (i32.const 2147483647))
 (global $~argumentsLength (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 2320))
 (global $~lib/memory/__heap_base i32 (i32.const 2572))
 (export "memory" (memory $0))
 (export "__new" (func $~lib/rt/pure/__new))
 (export "__renew" (func $~lib/rt/pure/__renew))
 (export "__retain" (func $~lib/rt/pure/__retain))
 (export "__release" (func $~lib/rt/pure/__release))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "deploy" (func $examples/flipper/flipper/deploy))
 (export "call" (func $examples/flipper/flipper/call))
 (start $~start)
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local.set $2
   (i32.load
    (local.get $1)
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.and
     (local.get $2)
     (i32.const 1)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 272)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $3
   (i32.and
    (local.get $2)
    (i32.xor
     (i32.const 3)
     (i32.const -1)
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.ge_u
      (local.get $3)
      (i32.const 12)
     )
     (i32.lt_u
      (local.get $3)
      (i32.const 1073741820)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 274)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (if
   (i32.lt_u
    (local.get $3)
    (i32.const 256)
   )
   (block
    (local.set $4
     (i32.const 0)
    )
    (local.set $5
     (i32.shr_u
      (local.get $3)
      (i32.const 4)
     )
    )
   )
   (block
    (local.set $4
     (i32.sub
      (i32.const 31)
      (i32.clz
       (local.get $3)
      )
     )
    )
    (local.set $5
     (i32.xor
      (i32.shr_u
       (local.get $3)
       (i32.sub
        (local.get $4)
        (i32.const 4)
       )
      )
      (i32.shl
       (i32.const 1)
       (i32.const 4)
      )
     )
    )
    (local.set $4
     (i32.sub
      (local.get $4)
      (i32.sub
       (i32.const 8)
       (i32.const 1)
      )
     )
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.lt_u
      (local.get $4)
      (i32.const 23)
     )
     (i32.lt_u
      (local.get $5)
      (i32.const 16)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 287)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $6
   (i32.load offset=4
    (local.get $1)
   )
  )
  (local.set $7
   (i32.load offset=8
    (local.get $1)
   )
  )
  (if
   (local.get $6)
   (i32.store offset=8
    (local.get $6)
    (local.get $7)
   )
  )
  (if
   (local.get $7)
   (i32.store offset=4
    (local.get $7)
    (local.get $6)
   )
  )
  (if
   (i32.eq
    (local.get $1)
    (block $~lib/rt/tlsf/GETHEAD|inlined.0 (result i32)
     (local.set $10
      (local.get $0)
     )
     (local.set $9
      (local.get $4)
     )
     (local.set $8
      (local.get $5)
     )
     (i32.load offset=96
      (i32.add
       (local.get $10)
       (i32.shl
        (i32.add
         (i32.shl
          (local.get $9)
          (i32.const 4)
         )
         (local.get $8)
        )
        (i32.const 2)
       )
      )
     )
    )
   )
   (block
    (block $~lib/rt/tlsf/SETHEAD|inlined.1
     (local.set $11
      (local.get $0)
     )
     (local.set $10
      (local.get $4)
     )
     (local.set $9
      (local.get $5)
     )
     (local.set $8
      (local.get $7)
     )
     (i32.store offset=96
      (i32.add
       (local.get $11)
       (i32.shl
        (i32.add
         (i32.shl
          (local.get $10)
          (i32.const 4)
         )
         (local.get $9)
        )
        (i32.const 2)
       )
      )
      (local.get $8)
     )
    )
    (if
     (i32.eqz
      (local.get $7)
     )
     (block
      (local.set $9
       (block $~lib/rt/tlsf/GETSL|inlined.0 (result i32)
        (local.set $9
         (local.get $0)
        )
        (local.set $8
         (local.get $4)
        )
        (i32.load offset=4
         (i32.add
          (local.get $9)
          (i32.shl
           (local.get $8)
           (i32.const 2)
          )
         )
        )
       )
      )
      (block $~lib/rt/tlsf/SETSL|inlined.1
       (local.set $8
        (local.get $0)
       )
       (local.set $11
        (local.get $4)
       )
       (local.set $10
        (local.tee $9
         (i32.and
          (local.get $9)
          (i32.xor
           (i32.shl
            (i32.const 1)
            (local.get $5)
           )
           (i32.const -1)
          )
         )
        )
       )
       (i32.store offset=4
        (i32.add
         (local.get $8)
         (i32.shl
          (local.get $11)
          (i32.const 2)
         )
        )
        (local.get $10)
       )
      )
      (if
       (i32.eqz
        (local.get $9)
       )
       (i32.store
        (local.get $0)
        (i32.and
         (i32.load
          (local.get $0)
         )
         (i32.xor
          (i32.shl
           (i32.const 1)
           (local.get $4)
          )
          (i32.const -1)
         )
        )
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (local.get $1)
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 200)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $2
   (i32.load
    (local.get $1)
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.and
     (local.get $2)
     (i32.const 1)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 202)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $4
   (block $~lib/rt/tlsf/GETRIGHT|inlined.0 (result i32)
    (local.set $3
     (local.get $1)
    )
    (i32.add
     (i32.add
      (local.get $3)
      (i32.const 4)
     )
     (i32.and
      (i32.load
       (local.get $3)
      )
      (i32.xor
       (i32.const 3)
       (i32.const -1)
      )
     )
    )
   )
  )
  (local.set $5
   (i32.load
    (local.get $4)
   )
  )
  (if
   (i32.and
    (local.get $5)
    (i32.const 1)
   )
   (block
    (local.set $3
     (i32.add
      (i32.add
       (i32.and
        (local.get $2)
        (i32.xor
         (i32.const 3)
         (i32.const -1)
        )
       )
       (i32.const 4)
      )
      (i32.and
       (local.get $5)
       (i32.xor
        (i32.const 3)
        (i32.const -1)
       )
      )
     )
    )
    (if
     (i32.lt_u
      (local.get $3)
      (i32.const 1073741820)
     )
     (block
      (call $~lib/rt/tlsf/removeBlock
       (local.get $0)
       (local.get $4)
      )
      (i32.store
       (local.get $1)
       (local.tee $2
        (i32.or
         (i32.and
          (local.get $2)
          (i32.const 3)
         )
         (local.get $3)
        )
       )
      )
      (local.set $4
       (block $~lib/rt/tlsf/GETRIGHT|inlined.1 (result i32)
        (local.set $6
         (local.get $1)
        )
        (i32.add
         (i32.add
          (local.get $6)
          (i32.const 4)
         )
         (i32.and
          (i32.load
           (local.get $6)
          )
          (i32.xor
           (i32.const 3)
           (i32.const -1)
          )
         )
        )
       )
      )
      (local.set $5
       (i32.load
        (local.get $4)
       )
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 2)
   )
   (block
    (local.set $6
     (block $~lib/rt/tlsf/GETFREELEFT|inlined.0 (result i32)
      (local.set $6
       (local.get $1)
      )
      (i32.load
       (i32.sub
        (local.get $6)
        (i32.const 4)
       )
      )
     )
    )
    (local.set $3
     (i32.load
      (local.get $6)
     )
    )
    (drop
     (i32.const 1)
    )
    (if
     (i32.eqz
      (i32.and
       (local.get $3)
       (i32.const 1)
      )
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 0)
       (i32.const 160)
       (i32.const 223)
       (i32.const 16)
      )
      (unreachable)
     )
    )
    (local.set $7
     (i32.add
      (i32.add
       (i32.and
        (local.get $3)
        (i32.xor
         (i32.const 3)
         (i32.const -1)
        )
       )
       (i32.const 4)
      )
      (i32.and
       (local.get $2)
       (i32.xor
        (i32.const 3)
        (i32.const -1)
       )
      )
     )
    )
    (if
     (i32.lt_u
      (local.get $7)
      (i32.const 1073741820)
     )
     (block
      (call $~lib/rt/tlsf/removeBlock
       (local.get $0)
       (local.get $6)
      )
      (i32.store
       (local.get $6)
       (local.tee $2
        (i32.or
         (i32.and
          (local.get $3)
          (i32.const 3)
         )
         (local.get $7)
        )
       )
      )
      (local.set $1
       (local.get $6)
      )
     )
    )
   )
  )
  (i32.store
   (local.get $4)
   (i32.or
    (local.get $5)
    (i32.const 2)
   )
  )
  (local.set $8
   (i32.and
    (local.get $2)
    (i32.xor
     (i32.const 3)
     (i32.const -1)
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.ge_u
      (local.get $8)
      (i32.const 12)
     )
     (i32.lt_u
      (local.get $8)
      (i32.const 1073741820)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 238)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.eq
     (i32.add
      (i32.add
       (local.get $1)
       (i32.const 4)
      )
      (local.get $8)
     )
     (local.get $4)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 239)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (i32.store
   (i32.sub
    (local.get $4)
    (i32.const 4)
   )
   (local.get $1)
  )
  (if
   (i32.lt_u
    (local.get $8)
    (i32.const 256)
   )
   (block
    (local.set $9
     (i32.const 0)
    )
    (local.set $10
     (i32.shr_u
      (local.get $8)
      (i32.const 4)
     )
    )
   )
   (block
    (local.set $9
     (i32.sub
      (i32.const 31)
      (i32.clz
       (local.get $8)
      )
     )
    )
    (local.set $10
     (i32.xor
      (i32.shr_u
       (local.get $8)
       (i32.sub
        (local.get $9)
        (i32.const 4)
       )
      )
      (i32.shl
       (i32.const 1)
       (i32.const 4)
      )
     )
    )
    (local.set $9
     (i32.sub
      (local.get $9)
      (i32.sub
       (i32.const 8)
       (i32.const 1)
      )
     )
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.lt_u
      (local.get $9)
      (i32.const 23)
     )
     (i32.lt_u
      (local.get $10)
      (i32.const 16)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 255)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $11
   (block $~lib/rt/tlsf/GETHEAD|inlined.1 (result i32)
    (local.set $7
     (local.get $0)
    )
    (local.set $3
     (local.get $9)
    )
    (local.set $6
     (local.get $10)
    )
    (i32.load offset=96
     (i32.add
      (local.get $7)
      (i32.shl
       (i32.add
        (i32.shl
         (local.get $3)
         (i32.const 4)
        )
        (local.get $6)
       )
       (i32.const 2)
      )
     )
    )
   )
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $11)
  )
  (if
   (local.get $11)
   (i32.store offset=4
    (local.get $11)
    (local.get $1)
   )
  )
  (block $~lib/rt/tlsf/SETHEAD|inlined.2
   (local.set $12
    (local.get $0)
   )
   (local.set $7
    (local.get $9)
   )
   (local.set $3
    (local.get $10)
   )
   (local.set $6
    (local.get $1)
   )
   (i32.store offset=96
    (i32.add
     (local.get $12)
     (i32.shl
      (i32.add
       (i32.shl
        (local.get $7)
        (i32.const 4)
       )
       (local.get $3)
      )
      (i32.const 2)
     )
    )
    (local.get $6)
   )
  )
  (i32.store
   (local.get $0)
   (i32.or
    (i32.load
     (local.get $0)
    )
    (i32.shl
     (i32.const 1)
     (local.get $9)
    )
   )
  )
  (block $~lib/rt/tlsf/SETSL|inlined.2
   (local.set $13
    (local.get $0)
   )
   (local.set $12
    (local.get $9)
   )
   (local.set $7
    (i32.or
     (block $~lib/rt/tlsf/GETSL|inlined.1 (result i32)
      (local.set $3
       (local.get $0)
      )
      (local.set $6
       (local.get $9)
      )
      (i32.load offset=4
       (i32.add
        (local.get $3)
        (i32.shl
         (local.get $6)
         (i32.const 2)
        )
       )
      )
     )
     (i32.shl
      (i32.const 1)
      (local.get $10)
     )
    )
   )
   (i32.store offset=4
    (i32.add
     (local.get $13)
     (i32.shl
      (local.get $12)
      (i32.const 2)
     )
    )
    (local.get $7)
   )
  )
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.le_u
     (local.get $1)
     (local.get $2)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 380)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $1
   (i32.sub
    (i32.and
     (i32.add
      (i32.add
       (local.get $1)
       (i32.const 4)
      )
      (i32.const 15)
     )
     (i32.xor
      (i32.const 15)
      (i32.const -1)
     )
    )
    (i32.const 4)
   )
  )
  (local.set $2
   (i32.and
    (local.get $2)
    (i32.xor
     (i32.const 15)
     (i32.const -1)
    )
   )
  )
  (local.set $4
   (block $~lib/rt/tlsf/GETTAIL|inlined.0 (result i32)
    (local.set $3
     (local.get $0)
    )
    (i32.load offset=1568
     (local.get $3)
    )
   )
  )
  (local.set $5
   (i32.const 0)
  )
  (if
   (local.get $4)
   (block
    (drop
     (i32.const 1)
    )
    (if
     (i32.eqz
      (i32.ge_u
       (local.get $1)
       (i32.add
        (local.get $4)
        (i32.const 4)
       )
      )
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 0)
       (i32.const 160)
       (i32.const 387)
       (i32.const 16)
      )
      (unreachable)
     )
    )
    (if
     (i32.eq
      (i32.sub
       (local.get $1)
       (i32.const 16)
      )
      (local.get $4)
     )
     (block
      (local.set $1
       (i32.sub
        (local.get $1)
        (i32.const 16)
       )
      )
      (local.set $5
       (i32.load
        (local.get $4)
       )
      )
     )
     (nop)
    )
   )
   (block
    (drop
     (i32.const 1)
    )
    (if
     (i32.eqz
      (i32.ge_u
       (local.get $1)
       (i32.add
        (local.get $0)
        (i32.const 1572)
       )
      )
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 0)
       (i32.const 160)
       (i32.const 400)
       (i32.const 5)
      )
      (unreachable)
     )
    )
   )
  )
  (local.set $6
   (i32.sub
    (local.get $2)
    (local.get $1)
   )
  )
  (if
   (i32.lt_u
    (local.get $6)
    (i32.add
     (i32.add
      (i32.const 4)
      (i32.const 12)
     )
     (i32.const 4)
    )
   )
   (block
    (return
     (i32.const 0)
    )
    (unreachable)
   )
  )
  (local.set $7
   (i32.sub
    (local.get $6)
    (i32.mul
     (i32.const 2)
     (i32.const 4)
    )
   )
  )
  (local.set $8
   (local.get $1)
  )
  (i32.store
   (local.get $8)
   (i32.or
    (i32.or
     (local.get $7)
     (i32.const 1)
    )
    (i32.and
     (local.get $5)
     (i32.const 2)
    )
   )
  )
  (i32.store offset=4
   (local.get $8)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $8)
   (i32.const 0)
  )
  (local.set $4
   (i32.add
    (i32.add
     (local.get $1)
     (i32.const 4)
    )
    (local.get $7)
   )
  )
  (i32.store
   (local.get $4)
   (i32.or
    (i32.const 0)
    (i32.const 2)
   )
  )
  (block $~lib/rt/tlsf/SETTAIL|inlined.1
   (local.set $9
    (local.get $0)
   )
   (local.set $3
    (local.get $4)
   )
   (i32.store offset=1568
    (local.get $9)
    (local.get $3)
   )
  )
  (call $~lib/rt/tlsf/insertBlock
   (local.get $0)
   (local.get $8)
  )
  (i32.const 1)
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local.set $0
   (i32.and
    (i32.add
     (global.get $~lib/memory/__heap_base)
     (i32.const 15)
    )
    (i32.xor
     (i32.const 15)
     (i32.const -1)
    )
   )
  )
  (local.set $1
   (memory.size)
  )
  (local.set $2
   (i32.shr_u
    (i32.and
     (i32.add
      (i32.add
       (local.get $0)
       (i32.const 1572)
      )
      (i32.const 65535)
     )
     (i32.xor
      (i32.const 65535)
      (i32.const -1)
     )
    )
    (i32.const 16)
   )
  )
  (if
   (if (result i32)
    (i32.gt_s
     (local.get $2)
     (local.get $1)
    )
    (i32.lt_s
     (memory.grow
      (i32.sub
       (local.get $2)
       (local.get $1)
      )
     )
     (i32.const 0)
    )
    (i32.const 0)
   )
   (unreachable)
  )
  (local.set $3
   (local.get $0)
  )
  (i32.store
   (local.get $3)
   (i32.const 0)
  )
  (block $~lib/rt/tlsf/SETTAIL|inlined.0
   (local.set $5
    (local.get $3)
   )
   (local.set $4
    (i32.const 0)
   )
   (i32.store offset=1568
    (local.get $5)
    (local.get $4)
   )
  )
  (local.set $5
   (i32.const 0)
  )
  (block $for-break0
   (loop $for-loop|0
    (local.set $4
     (i32.lt_u
      (local.get $5)
      (i32.const 23)
     )
    )
    (if
     (local.get $4)
     (block
      (block $for-continue|0
       (block $~lib/rt/tlsf/SETSL|inlined.0
        (local.set $8
         (local.get $3)
        )
        (local.set $7
         (local.get $5)
        )
        (local.set $6
         (i32.const 0)
        )
        (i32.store offset=4
         (i32.add
          (local.get $8)
          (i32.shl
           (local.get $7)
           (i32.const 2)
          )
         )
         (local.get $6)
        )
       )
       (local.set $8
        (i32.const 0)
       )
       (block $for-break1
        (loop $for-loop|1
         (local.set $7
          (i32.lt_u
           (local.get $8)
           (i32.const 16)
          )
         )
         (if
          (local.get $7)
          (block
           (block $for-continue|1
            (block $~lib/rt/tlsf/SETHEAD|inlined.0
             (local.set $11
              (local.get $3)
             )
             (local.set $10
              (local.get $5)
             )
             (local.set $9
              (local.get $8)
             )
             (local.set $6
              (i32.const 0)
             )
             (i32.store offset=96
              (i32.add
               (local.get $11)
               (i32.shl
                (i32.add
                 (i32.shl
                  (local.get $10)
                  (i32.const 4)
                 )
                 (local.get $9)
                )
                (i32.const 2)
               )
              )
              (local.get $6)
             )
            )
           )
           (local.set $8
            (i32.add
             (local.get $8)
             (i32.const 1)
            )
           )
           (br $for-loop|1)
          )
         )
        )
       )
      )
      (local.set $5
       (i32.add
        (local.get $5)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
  (local.set $12
   (i32.add
    (local.get $0)
    (i32.const 1572)
   )
  )
  (drop
   (i32.const 0)
  )
  (drop
   (call $~lib/rt/tlsf/addMemory
    (local.get $3)
    (local.get $12)
    (i32.shl
     (memory.size)
     (i32.const 16)
    )
   )
  )
  (global.set $~lib/rt/tlsf/ROOT
   (local.get $3)
  )
 )
 (func $~lib/rt/tlsf/computeSize (param $0 i32) (result i32)
  (if (result i32)
   (i32.le_u
    (local.get $0)
    (i32.const 12)
   )
   (i32.const 12)
   (i32.sub
    (i32.and
     (i32.add
      (i32.add
       (local.get $0)
       (i32.const 4)
      )
      (i32.const 15)
     )
     (i32.xor
      (i32.const 15)
      (i32.const -1)
     )
    )
    (i32.const 4)
   )
  )
 )
 (func $~lib/rt/tlsf/prepareSize (param $0 i32) (result i32)
  (if
   (i32.ge_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 32)
      (i32.const 160)
      (i32.const 461)
      (i32.const 30)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (call $~lib/rt/tlsf/computeSize
   (local.get $0)
  )
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (if
   (i32.lt_u
    (local.get $1)
    (i32.const 256)
   )
   (block
    (local.set $2
     (i32.const 0)
    )
    (local.set $3
     (i32.shr_u
      (local.get $1)
      (i32.const 4)
     )
    )
   )
   (block
    (local.set $4
     (if (result i32)
      (i32.lt_u
       (local.get $1)
       (i32.const 536870910)
      )
      (i32.sub
       (i32.add
        (local.get $1)
        (i32.shl
         (i32.const 1)
         (i32.sub
          (i32.const 27)
          (i32.clz
           (local.get $1)
          )
         )
        )
       )
       (i32.const 1)
      )
      (local.get $1)
     )
    )
    (local.set $2
     (i32.sub
      (i32.const 31)
      (i32.clz
       (local.get $4)
      )
     )
    )
    (local.set $3
     (i32.xor
      (i32.shr_u
       (local.get $4)
       (i32.sub
        (local.get $2)
        (i32.const 4)
       )
      )
      (i32.shl
       (i32.const 1)
       (i32.const 4)
      )
     )
    )
    (local.set $2
     (i32.sub
      (local.get $2)
      (i32.sub
       (i32.const 8)
       (i32.const 1)
      )
     )
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.lt_u
      (local.get $2)
      (i32.const 23)
     )
     (i32.lt_u
      (local.get $3)
      (i32.const 16)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 333)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $6
   (i32.and
    (block $~lib/rt/tlsf/GETSL|inlined.2 (result i32)
     (local.set $5
      (local.get $0)
     )
     (local.set $4
      (local.get $2)
     )
     (i32.load offset=4
      (i32.add
       (local.get $5)
       (i32.shl
        (local.get $4)
        (i32.const 2)
       )
      )
     )
    )
    (i32.shl
     (i32.xor
      (i32.const 0)
      (i32.const -1)
     )
     (local.get $3)
    )
   )
  )
  (local.set $7
   (i32.const 0)
  )
  (if
   (i32.eqz
    (local.get $6)
   )
   (block
    (local.set $5
     (i32.and
      (i32.load
       (local.get $0)
      )
      (i32.shl
       (i32.xor
        (i32.const 0)
        (i32.const -1)
       )
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
     )
    )
    (if
     (i32.eqz
      (local.get $5)
     )
     (local.set $7
      (i32.const 0)
     )
     (block
      (local.set $2
       (i32.ctz
        (local.get $5)
       )
      )
      (local.set $6
       (block $~lib/rt/tlsf/GETSL|inlined.3 (result i32)
        (local.set $8
         (local.get $0)
        )
        (local.set $4
         (local.get $2)
        )
        (i32.load offset=4
         (i32.add
          (local.get $8)
          (i32.shl
           (local.get $4)
           (i32.const 2)
          )
         )
        )
       )
      )
      (drop
       (i32.const 1)
      )
      (if
       (i32.eqz
        (local.get $6)
       )
       (block
        (call $~lib/builtins/abort
         (i32.const 0)
         (i32.const 160)
         (i32.const 346)
         (i32.const 18)
        )
        (unreachable)
       )
      )
      (local.set $7
       (block $~lib/rt/tlsf/GETHEAD|inlined.2 (result i32)
        (local.set $9
         (local.get $0)
        )
        (local.set $8
         (local.get $2)
        )
        (local.set $4
         (i32.ctz
          (local.get $6)
         )
        )
        (i32.load offset=96
         (i32.add
          (local.get $9)
          (i32.shl
           (i32.add
            (i32.shl
             (local.get $8)
             (i32.const 4)
            )
            (local.get $4)
           )
           (i32.const 2)
          )
         )
        )
       )
      )
     )
    )
   )
   (local.set $7
    (block $~lib/rt/tlsf/GETHEAD|inlined.3 (result i32)
     (local.set $9
      (local.get $0)
     )
     (local.set $8
      (local.get $2)
     )
     (local.set $4
      (i32.ctz
       (local.get $6)
      )
     )
     (i32.load offset=96
      (i32.add
       (local.get $9)
       (i32.shl
        (i32.add
         (i32.shl
          (local.get $8)
          (i32.const 4)
         )
         (local.get $4)
        )
        (i32.const 2)
       )
      )
     )
    )
   )
  )
  (local.get $7)
 )
 (func $~lib/rt/tlsf/growMemory (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (drop
   (i32.const 0)
  )
  (if
   (i32.lt_u
    (local.get $1)
    (i32.const 536870910)
   )
   (local.set $1
    (i32.add
     (local.get $1)
     (i32.sub
      (i32.shl
       (i32.const 1)
       (i32.sub
        (i32.const 27)
        (i32.clz
         (local.get $1)
        )
       )
      )
      (i32.const 1)
     )
    )
   )
  )
  (local.set $2
   (memory.size)
  )
  (local.set $1
   (i32.add
    (local.get $1)
    (i32.shl
     (i32.const 4)
     (i32.ne
      (i32.sub
       (i32.shl
        (local.get $2)
        (i32.const 16)
       )
       (i32.const 4)
      )
      (block $~lib/rt/tlsf/GETTAIL|inlined.1 (result i32)
       (local.set $3
        (local.get $0)
       )
       (i32.load offset=1568
        (local.get $3)
       )
      )
     )
    )
   )
  )
  (local.set $4
   (i32.shr_u
    (i32.and
     (i32.add
      (local.get $1)
      (i32.const 65535)
     )
     (i32.xor
      (i32.const 65535)
      (i32.const -1)
     )
    )
    (i32.const 16)
   )
  )
  (local.set $6
   (select
    (local.tee $3
     (local.get $2)
    )
    (local.tee $5
     (local.get $4)
    )
    (i32.gt_s
     (local.get $3)
     (local.get $5)
    )
   )
  )
  (if
   (i32.lt_s
    (memory.grow
     (local.get $6)
    )
    (i32.const 0)
   )
   (if
    (i32.lt_s
     (memory.grow
      (local.get $4)
     )
     (i32.const 0)
    )
    (unreachable)
   )
  )
  (local.set $7
   (memory.size)
  )
  (drop
   (call $~lib/rt/tlsf/addMemory
    (local.get $0)
    (i32.shl
     (local.get $2)
     (i32.const 16)
    )
    (i32.shl
     (local.get $7)
     (i32.const 16)
    )
   )
  )
 )
 (func $~lib/rt/tlsf/prepareBlock (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $3
   (i32.load
    (local.get $1)
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.eqz
     (i32.and
      (i32.add
       (local.get $2)
       (i32.const 4)
      )
      (i32.const 15)
     )
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 360)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (local.set $4
   (i32.sub
    (i32.and
     (local.get $3)
     (i32.xor
      (i32.const 3)
      (i32.const -1)
     )
    )
    (local.get $2)
   )
  )
  (if
   (i32.ge_u
    (local.get $4)
    (i32.add
     (i32.const 4)
     (i32.const 12)
    )
   )
   (block
    (i32.store
     (local.get $1)
     (i32.or
      (local.get $2)
      (i32.and
       (local.get $3)
       (i32.const 2)
      )
     )
    )
    (local.set $5
     (i32.add
      (i32.add
       (local.get $1)
       (i32.const 4)
      )
      (local.get $2)
     )
    )
    (i32.store
     (local.get $5)
     (i32.or
      (i32.sub
       (local.get $4)
       (i32.const 4)
      )
      (i32.const 1)
     )
    )
    (call $~lib/rt/tlsf/insertBlock
     (local.get $0)
     (local.get $5)
    )
   )
   (block
    (i32.store
     (local.get $1)
     (i32.and
      (local.get $3)
      (i32.xor
       (i32.const 1)
       (i32.const -1)
      )
     )
    )
    (i32.store
     (block $~lib/rt/tlsf/GETRIGHT|inlined.3 (result i32)
      (local.set $5
       (local.get $1)
      )
      (i32.add
       (i32.add
        (local.get $5)
        (i32.const 4)
       )
       (i32.and
        (i32.load
         (local.get $5)
        )
        (i32.xor
         (i32.const 3)
         (i32.const -1)
        )
       )
      )
     )
     (i32.and
      (i32.load
       (block $~lib/rt/tlsf/GETRIGHT|inlined.2 (result i32)
        (local.set $5
         (local.get $1)
        )
        (i32.add
         (i32.add
          (local.get $5)
          (i32.const 4)
         )
         (i32.and
          (i32.load
           (local.get $5)
          )
          (i32.xor
           (i32.const 3)
           (i32.const -1)
          )
         )
        )
       )
      )
      (i32.xor
       (i32.const 2)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $2
   (call $~lib/rt/tlsf/prepareSize
    (local.get $1)
   )
  )
  (local.set $3
   (call $~lib/rt/tlsf/searchBlock
    (local.get $0)
    (local.get $2)
   )
  )
  (if
   (i32.eqz
    (local.get $3)
   )
   (block
    (call $~lib/rt/tlsf/growMemory
     (local.get $0)
     (local.get $2)
    )
    (local.set $3
     (call $~lib/rt/tlsf/searchBlock
      (local.get $0)
      (local.get $2)
     )
    )
    (drop
     (i32.const 1)
    )
    (if
     (i32.eqz
      (local.get $3)
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 0)
       (i32.const 160)
       (i32.const 498)
       (i32.const 16)
      )
      (unreachable)
     )
    )
   )
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.ge_u
     (i32.and
      (i32.load
       (local.get $3)
      )
      (i32.xor
       (i32.const 3)
       (i32.const -1)
      )
     )
     (local.get $2)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 500)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (call $~lib/rt/tlsf/removeBlock
   (local.get $0)
   (local.get $3)
  )
  (call $~lib/rt/tlsf/prepareBlock
   (local.get $0)
   (local.get $3)
   (local.get $2)
  )
  (drop
   (i32.const 0)
  )
  (local.get $3)
 )
 (func $~lib/rt/tlsf/__alloc (param $0 i32) (result i32)
  (if
   (i32.eqz
    (global.get $~lib/rt/tlsf/ROOT)
   )
   (call $~lib/rt/tlsf/initialize)
  )
  (i32.add
   (call $~lib/rt/tlsf/allocateBlock
    (global.get $~lib/rt/tlsf/ROOT)
    (local.get $0)
   )
   (i32.const 4)
  )
 )
 (func $~lib/rt/pure/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741804)
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 32)
      (i32.const 96)
      (i32.const 275)
      (i32.const 30)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (local.set $2
   (call $~lib/rt/tlsf/__alloc
    (i32.add
     (i32.const 16)
     (local.get $0)
    )
   )
  )
  (local.set $3
   (i32.sub
    (local.get $2)
    (i32.const 4)
   )
  )
  (i32.store offset=4
   (local.get $3)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $3)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $3)
   (local.get $1)
  )
  (i32.store offset=16
   (local.get $3)
   (local.get $0)
  )
  (i32.add
   (local.get $2)
   (i32.const 16)
  )
 )
 (func $~lib/rt/tlsf/checkUsedBlock (param $0 i32) (result i32)
  (local $1 i32)
  (local.set $1
   (i32.sub
    (local.get $0)
    (i32.const 4)
   )
  )
  (if
   (i32.eqz
    (if (result i32)
     (if (result i32)
      (i32.ne
       (local.get $0)
       (i32.const 0)
      )
      (i32.eqz
       (i32.and
        (local.get $0)
        (i32.const 15)
       )
      )
      (i32.const 0)
     )
     (i32.eqz
      (i32.and
       (i32.load
        (local.get $1)
       )
       (i32.const 1)
      )
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 160)
     (i32.const 563)
     (i32.const 3)
    )
    (unreachable)
   )
  )
  (local.get $1)
 )
 (func $~lib/util/memory/memcpy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block $while-break|0
   (loop $while-continue|0
    (local.set $5
     (if (result i32)
      (local.get $2)
      (i32.and
       (local.get $1)
       (i32.const 3)
      )
      (i32.const 0)
     )
    )
    (if
     (local.get $5)
     (block
      (i32.store8
       (block (result i32)
        (local.set $0
         (i32.add
          (local.tee $6
           (local.get $0)
          )
          (i32.const 1)
         )
        )
        (local.get $6)
       )
       (i32.load8_u
        (block (result i32)
         (local.set $1
          (i32.add
           (local.tee $6
            (local.get $1)
           )
           (i32.const 1)
          )
         )
         (local.get $6)
        )
       )
      )
      (local.set $2
       (i32.sub
        (local.get $2)
        (i32.const 1)
       )
      )
      (br $while-continue|0)
     )
    )
   )
  )
  (if
   (i32.eq
    (i32.and
     (local.get $0)
     (i32.const 3)
    )
    (i32.const 0)
   )
   (block
    (block $while-break|1
     (loop $while-continue|1
      (local.set $5
       (i32.ge_u
        (local.get $2)
        (i32.const 16)
       )
      )
      (if
       (local.get $5)
       (block
        (i32.store
         (local.get $0)
         (i32.load
          (local.get $1)
         )
        )
        (i32.store
         (i32.add
          (local.get $0)
          (i32.const 4)
         )
         (i32.load
          (i32.add
           (local.get $1)
           (i32.const 4)
          )
         )
        )
        (i32.store
         (i32.add
          (local.get $0)
          (i32.const 8)
         )
         (i32.load
          (i32.add
           (local.get $1)
           (i32.const 8)
          )
         )
        )
        (i32.store
         (i32.add
          (local.get $0)
          (i32.const 12)
         )
         (i32.load
          (i32.add
           (local.get $1)
           (i32.const 12)
          )
         )
        )
        (local.set $1
         (i32.add
          (local.get $1)
          (i32.const 16)
         )
        )
        (local.set $0
         (i32.add
          (local.get $0)
          (i32.const 16)
         )
        )
        (local.set $2
         (i32.sub
          (local.get $2)
          (i32.const 16)
         )
        )
        (br $while-continue|1)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 8)
     )
     (block
      (i32.store
       (local.get $0)
       (i32.load
        (local.get $1)
       )
      )
      (i32.store
       (i32.add
        (local.get $0)
        (i32.const 4)
       )
       (i32.load
        (i32.add
         (local.get $1)
         (i32.const 4)
        )
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 8)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 8)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 4)
     )
     (block
      (i32.store
       (local.get $0)
       (i32.load
        (local.get $1)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 4)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 4)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 2)
     )
     (block
      (i32.store16
       (local.get $0)
       (i32.load16_u
        (local.get $1)
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 2)
       )
      )
      (local.set $1
       (i32.add
        (local.get $1)
        (i32.const 2)
       )
      )
     )
    )
    (if
     (i32.and
      (local.get $2)
      (i32.const 1)
     )
     (i32.store8
      (block (result i32)
       (local.set $0
        (i32.add
         (local.tee $5
          (local.get $0)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
      (i32.load8_u
       (block (result i32)
        (local.set $1
         (i32.add
          (local.tee $5
           (local.get $1)
          )
          (i32.const 1)
         )
        )
        (local.get $5)
       )
      )
     )
    )
    (return)
    (unreachable)
   )
  )
  (if
   (i32.ge_u
    (local.get $2)
    (i32.const 32)
   )
   (block $break|2
    (block $case2|2
     (block $case1|2
      (block $case0|2
       (local.set $5
        (i32.and
         (local.get $0)
         (i32.const 3)
        )
       )
       (br_if $case0|2
        (i32.eq
         (local.get $5)
         (i32.const 1)
        )
       )
       (br_if $case1|2
        (i32.eq
         (local.get $5)
         (i32.const 2)
        )
       )
       (br_if $case2|2
        (i32.eq
         (local.get $5)
         (i32.const 3)
        )
       )
       (br $break|2)
      )
      (block
       (local.set $3
        (i32.load
         (local.get $1)
        )
       )
       (i32.store8
        (block (result i32)
         (local.set $0
          (i32.add
           (local.tee $5
            (local.get $0)
           )
           (i32.const 1)
          )
         )
         (local.get $5)
        )
        (i32.load8_u
         (block (result i32)
          (local.set $1
           (i32.add
            (local.tee $5
             (local.get $1)
            )
            (i32.const 1)
           )
          )
          (local.get $5)
         )
        )
       )
       (i32.store8
        (block (result i32)
         (local.set $0
          (i32.add
           (local.tee $5
            (local.get $0)
           )
           (i32.const 1)
          )
         )
         (local.get $5)
        )
        (i32.load8_u
         (block (result i32)
          (local.set $1
           (i32.add
            (local.tee $5
             (local.get $1)
            )
            (i32.const 1)
           )
          )
          (local.get $5)
         )
        )
       )
       (i32.store8
        (block (result i32)
         (local.set $0
          (i32.add
           (local.tee $5
            (local.get $0)
           )
           (i32.const 1)
          )
         )
         (local.get $5)
        )
        (i32.load8_u
         (block (result i32)
          (local.set $1
           (i32.add
            (local.tee $5
             (local.get $1)
            )
            (i32.const 1)
           )
          )
          (local.get $5)
         )
        )
       )
       (local.set $2
        (i32.sub
         (local.get $2)
         (i32.const 3)
        )
       )
       (block $while-break|3
        (loop $while-continue|3
         (local.set $5
          (i32.ge_u
           (local.get $2)
           (i32.const 17)
          )
         )
         (if
          (local.get $5)
          (block
           (local.set $4
            (i32.load
             (i32.add
              (local.get $1)
              (i32.const 1)
             )
            )
           )
           (i32.store
            (local.get $0)
            (i32.or
             (i32.shr_u
              (local.get $3)
              (i32.const 24)
             )
             (i32.shl
              (local.get $4)
              (i32.const 8)
             )
            )
           )
           (local.set $3
            (i32.load
             (i32.add
              (local.get $1)
              (i32.const 5)
             )
            )
           )
           (i32.store
            (i32.add
             (local.get $0)
             (i32.const 4)
            )
            (i32.or
             (i32.shr_u
              (local.get $4)
              (i32.const 24)
             )
             (i32.shl
              (local.get $3)
              (i32.const 8)
             )
            )
           )
           (local.set $4
            (i32.load
             (i32.add
              (local.get $1)
              (i32.const 9)
             )
            )
           )
           (i32.store
            (i32.add
             (local.get $0)
             (i32.const 8)
            )
            (i32.or
             (i32.shr_u
              (local.get $3)
              (i32.const 24)
             )
             (i32.shl
              (local.get $4)
              (i32.const 8)
             )
            )
           )
           (local.set $3
            (i32.load
             (i32.add
              (local.get $1)
              (i32.const 13)
             )
            )
           )
           (i32.store
            (i32.add
             (local.get $0)
             (i32.const 12)
            )
            (i32.or
             (i32.shr_u
              (local.get $4)
              (i32.const 24)
             )
             (i32.shl
              (local.get $3)
              (i32.const 8)
             )
            )
           )
           (local.set $1
            (i32.add
             (local.get $1)
             (i32.const 16)
            )
           )
           (local.set $0
            (i32.add
             (local.get $0)
             (i32.const 16)
            )
           )
           (local.set $2
            (i32.sub
             (local.get $2)
             (i32.const 16)
            )
           )
           (br $while-continue|3)
          )
         )
        )
       )
       (br $break|2)
      )
     )
     (block
      (local.set $3
       (i32.load
        (local.get $1)
       )
      )
      (i32.store8
       (block (result i32)
        (local.set $0
         (i32.add
          (local.tee $5
           (local.get $0)
          )
          (i32.const 1)
         )
        )
        (local.get $5)
       )
       (i32.load8_u
        (block (result i32)
         (local.set $1
          (i32.add
           (local.tee $5
            (local.get $1)
           )
           (i32.const 1)
          )
         )
         (local.get $5)
        )
       )
      )
      (i32.store8
       (block (result i32)
        (local.set $0
         (i32.add
          (local.tee $5
           (local.get $0)
          )
          (i32.const 1)
         )
        )
        (local.get $5)
       )
       (i32.load8_u
        (block (result i32)
         (local.set $1
          (i32.add
           (local.tee $5
            (local.get $1)
           )
           (i32.const 1)
          )
         )
         (local.get $5)
        )
       )
      )
      (local.set $2
       (i32.sub
        (local.get $2)
        (i32.const 2)
       )
      )
      (block $while-break|4
       (loop $while-continue|4
        (local.set $5
         (i32.ge_u
          (local.get $2)
          (i32.const 18)
         )
        )
        (if
         (local.get $5)
         (block
          (local.set $4
           (i32.load
            (i32.add
             (local.get $1)
             (i32.const 2)
            )
           )
          )
          (i32.store
           (local.get $0)
           (i32.or
            (i32.shr_u
             (local.get $3)
             (i32.const 16)
            )
            (i32.shl
             (local.get $4)
             (i32.const 16)
            )
           )
          )
          (local.set $3
           (i32.load
            (i32.add
             (local.get $1)
             (i32.const 6)
            )
           )
          )
          (i32.store
           (i32.add
            (local.get $0)
            (i32.const 4)
           )
           (i32.or
            (i32.shr_u
             (local.get $4)
             (i32.const 16)
            )
            (i32.shl
             (local.get $3)
             (i32.const 16)
            )
           )
          )
          (local.set $4
           (i32.load
            (i32.add
             (local.get $1)
             (i32.const 10)
            )
           )
          )
          (i32.store
           (i32.add
            (local.get $0)
            (i32.const 8)
           )
           (i32.or
            (i32.shr_u
             (local.get $3)
             (i32.const 16)
            )
            (i32.shl
             (local.get $4)
             (i32.const 16)
            )
           )
          )
          (local.set $3
           (i32.load
            (i32.add
             (local.get $1)
             (i32.const 14)
            )
           )
          )
          (i32.store
           (i32.add
            (local.get $0)
            (i32.const 12)
           )
           (i32.or
            (i32.shr_u
             (local.get $4)
             (i32.const 16)
            )
            (i32.shl
             (local.get $3)
             (i32.const 16)
            )
           )
          )
          (local.set $1
           (i32.add
            (local.get $1)
            (i32.const 16)
           )
          )
          (local.set $0
           (i32.add
            (local.get $0)
            (i32.const 16)
           )
          )
          (local.set $2
           (i32.sub
            (local.get $2)
            (i32.const 16)
           )
          )
          (br $while-continue|4)
         )
        )
       )
      )
      (br $break|2)
     )
    )
    (block
     (local.set $3
      (i32.load
       (local.get $1)
      )
     )
     (i32.store8
      (block (result i32)
       (local.set $0
        (i32.add
         (local.tee $5
          (local.get $0)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
      (i32.load8_u
       (block (result i32)
        (local.set $1
         (i32.add
          (local.tee $5
           (local.get $1)
          )
          (i32.const 1)
         )
        )
        (local.get $5)
       )
      )
     )
     (local.set $2
      (i32.sub
       (local.get $2)
       (i32.const 1)
      )
     )
     (block $while-break|5
      (loop $while-continue|5
       (local.set $5
        (i32.ge_u
         (local.get $2)
         (i32.const 19)
        )
       )
       (if
        (local.get $5)
        (block
         (local.set $4
          (i32.load
           (i32.add
            (local.get $1)
            (i32.const 3)
           )
          )
         )
         (i32.store
          (local.get $0)
          (i32.or
           (i32.shr_u
            (local.get $3)
            (i32.const 8)
           )
           (i32.shl
            (local.get $4)
            (i32.const 24)
           )
          )
         )
         (local.set $3
          (i32.load
           (i32.add
            (local.get $1)
            (i32.const 7)
           )
          )
         )
         (i32.store
          (i32.add
           (local.get $0)
           (i32.const 4)
          )
          (i32.or
           (i32.shr_u
            (local.get $4)
            (i32.const 8)
           )
           (i32.shl
            (local.get $3)
            (i32.const 24)
           )
          )
         )
         (local.set $4
          (i32.load
           (i32.add
            (local.get $1)
            (i32.const 11)
           )
          )
         )
         (i32.store
          (i32.add
           (local.get $0)
           (i32.const 8)
          )
          (i32.or
           (i32.shr_u
            (local.get $3)
            (i32.const 8)
           )
           (i32.shl
            (local.get $4)
            (i32.const 24)
           )
          )
         )
         (local.set $3
          (i32.load
           (i32.add
            (local.get $1)
            (i32.const 15)
           )
          )
         )
         (i32.store
          (i32.add
           (local.get $0)
           (i32.const 12)
          )
          (i32.or
           (i32.shr_u
            (local.get $4)
            (i32.const 8)
           )
           (i32.shl
            (local.get $3)
            (i32.const 24)
           )
          )
         )
         (local.set $1
          (i32.add
           (local.get $1)
           (i32.const 16)
          )
         )
         (local.set $0
          (i32.add
           (local.get $0)
           (i32.const 16)
          )
         )
         (local.set $2
          (i32.sub
           (local.get $2)
           (i32.const 16)
          )
         )
         (br $while-continue|5)
        )
       )
      )
     )
     (br $break|2)
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 16)
   )
   (block
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 8)
   )
   (block
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 4)
   )
   (block
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 2)
   )
   (block
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
    (i32.store8
     (block (result i32)
      (local.set $0
       (i32.add
        (local.tee $5
         (local.get $0)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
     (i32.load8_u
      (block (result i32)
       (local.set $1
        (i32.add
         (local.tee $5
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (local.get $5)
      )
     )
    )
   )
  )
  (if
   (i32.and
    (local.get $2)
    (i32.const 1)
   )
   (i32.store8
    (block (result i32)
     (local.set $0
      (i32.add
       (local.tee $5
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (local.get $5)
    )
    (i32.load8_u
     (block (result i32)
      (local.set $1
       (i32.add
        (local.tee $5
         (local.get $1)
        )
        (i32.const 1)
       )
      )
      (local.get $5)
     )
    )
   )
  )
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (block $~lib/util/memory/memmove|inlined.0
   (local.set $5
    (local.get $0)
   )
   (local.set $4
    (local.get $1)
   )
   (local.set $3
    (local.get $2)
   )
   (if
    (i32.eq
     (local.get $5)
     (local.get $4)
    )
    (block
     (br $~lib/util/memory/memmove|inlined.0)
     (unreachable)
    )
   )
   (drop
    (i32.lt_s
     (i32.const 0)
     (i32.const 1)
    )
   )
   (if
    (i32.le_u
     (i32.sub
      (i32.sub
       (local.get $4)
       (local.get $5)
      )
      (local.get $3)
     )
     (i32.sub
      (i32.const 0)
      (i32.shl
       (local.get $3)
       (i32.const 1)
      )
     )
    )
    (block
     (call $~lib/util/memory/memcpy
      (local.get $5)
      (local.get $4)
      (local.get $3)
     )
     (br $~lib/util/memory/memmove|inlined.0)
     (unreachable)
    )
   )
   (if
    (i32.lt_u
     (local.get $5)
     (local.get $4)
    )
    (block
     (drop
      (i32.lt_s
       (i32.const 0)
       (i32.const 2)
      )
     )
     (if
      (i32.eq
       (i32.and
        (local.get $4)
        (i32.const 7)
       )
       (i32.and
        (local.get $5)
        (i32.const 7)
       )
      )
      (block
       (block $while-break|0
        (loop $while-continue|0
         (local.set $6
          (i32.and
           (local.get $5)
           (i32.const 7)
          )
         )
         (if
          (local.get $6)
          (block
           (if
            (i32.eqz
             (local.get $3)
            )
            (block
             (br $~lib/util/memory/memmove|inlined.0)
             (unreachable)
            )
           )
           (local.set $3
            (i32.sub
             (local.get $3)
             (i32.const 1)
            )
           )
           (i32.store8
            (block (result i32)
             (local.set $5
              (i32.add
               (local.tee $7
                (local.get $5)
               )
               (i32.const 1)
              )
             )
             (local.get $7)
            )
            (i32.load8_u
             (block (result i32)
              (local.set $4
               (i32.add
                (local.tee $7
                 (local.get $4)
                )
                (i32.const 1)
               )
              )
              (local.get $7)
             )
            )
           )
           (br $while-continue|0)
          )
         )
        )
       )
       (block $while-break|1
        (loop $while-continue|1
         (local.set $6
          (i32.ge_u
           (local.get $3)
           (i32.const 8)
          )
         )
         (if
          (local.get $6)
          (block
           (i64.store
            (local.get $5)
            (i64.load
             (local.get $4)
            )
           )
           (local.set $3
            (i32.sub
             (local.get $3)
             (i32.const 8)
            )
           )
           (local.set $5
            (i32.add
             (local.get $5)
             (i32.const 8)
            )
           )
           (local.set $4
            (i32.add
             (local.get $4)
             (i32.const 8)
            )
           )
           (br $while-continue|1)
          )
         )
        )
       )
      )
     )
     (block $while-break|2
      (loop $while-continue|2
       (local.set $6
        (local.get $3)
       )
       (if
        (local.get $6)
        (block
         (i32.store8
          (block (result i32)
           (local.set $5
            (i32.add
             (local.tee $7
              (local.get $5)
             )
             (i32.const 1)
            )
           )
           (local.get $7)
          )
          (i32.load8_u
           (block (result i32)
            (local.set $4
             (i32.add
              (local.tee $7
               (local.get $4)
              )
              (i32.const 1)
             )
            )
            (local.get $7)
           )
          )
         )
         (local.set $3
          (i32.sub
           (local.get $3)
           (i32.const 1)
          )
         )
         (br $while-continue|2)
        )
       )
      )
     )
    )
    (block
     (drop
      (i32.lt_s
       (i32.const 0)
       (i32.const 2)
      )
     )
     (if
      (i32.eq
       (i32.and
        (local.get $4)
        (i32.const 7)
       )
       (i32.and
        (local.get $5)
        (i32.const 7)
       )
      )
      (block
       (block $while-break|3
        (loop $while-continue|3
         (local.set $6
          (i32.and
           (i32.add
            (local.get $5)
            (local.get $3)
           )
           (i32.const 7)
          )
         )
         (if
          (local.get $6)
          (block
           (if
            (i32.eqz
             (local.get $3)
            )
            (block
             (br $~lib/util/memory/memmove|inlined.0)
             (unreachable)
            )
           )
           (i32.store8
            (i32.add
             (local.get $5)
             (local.tee $3
              (i32.sub
               (local.get $3)
               (i32.const 1)
              )
             )
            )
            (i32.load8_u
             (i32.add
              (local.get $4)
              (local.get $3)
             )
            )
           )
           (br $while-continue|3)
          )
         )
        )
       )
       (block $while-break|4
        (loop $while-continue|4
         (local.set $6
          (i32.ge_u
           (local.get $3)
           (i32.const 8)
          )
         )
         (if
          (local.get $6)
          (block
           (local.set $3
            (i32.sub
             (local.get $3)
             (i32.const 8)
            )
           )
           (i64.store
            (i32.add
             (local.get $5)
             (local.get $3)
            )
            (i64.load
             (i32.add
              (local.get $4)
              (local.get $3)
             )
            )
           )
           (br $while-continue|4)
          )
         )
        )
       )
      )
     )
     (block $while-break|5
      (loop $while-continue|5
       (local.set $6
        (local.get $3)
       )
       (if
        (local.get $6)
        (block
         (i32.store8
          (i32.add
           (local.get $5)
           (local.tee $3
            (i32.sub
             (local.get $3)
             (i32.const 1)
            )
           )
          )
          (i32.load8_u
           (i32.add
            (local.get $4)
            (local.get $3)
           )
          )
         )
         (br $while-continue|5)
        )
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/tlsf/freeBlock (param $0 i32) (param $1 i32)
  (i32.store
   (local.get $1)
   (i32.or
    (i32.load
     (local.get $1)
    )
    (i32.const 1)
   )
  )
  (drop
   (i32.const 0)
  )
  (call $~lib/rt/tlsf/insertBlock
   (local.get $0)
   (local.get $1)
  )
 )
 (func $~lib/rt/tlsf/moveBlock (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local.set $3
   (call $~lib/rt/tlsf/allocateBlock
    (local.get $0)
    (local.get $2)
   )
  )
  (call $~lib/memory/memory.copy
   (i32.add
    (local.get $3)
    (i32.const 4)
   )
   (i32.add
    (local.get $1)
    (i32.const 4)
   )
   (i32.and
    (i32.load
     (local.get $1)
    )
    (i32.xor
     (i32.const 3)
     (i32.const -1)
    )
   )
  )
  (if
   (i32.ge_u
    (local.get $1)
    (global.get $~lib/memory/__heap_base)
   )
   (block
    (drop
     (i32.const 0)
    )
    (call $~lib/rt/tlsf/freeBlock
     (local.get $0)
     (local.get $1)
    )
   )
  )
  (local.get $3)
 )
 (func $~lib/rt/tlsf/reallocateBlock (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local.set $3
   (call $~lib/rt/tlsf/prepareSize
    (local.get $2)
   )
  )
  (local.set $4
   (i32.load
    (local.get $1)
   )
  )
  (local.set $5
   (i32.and
    (local.get $4)
    (i32.xor
     (i32.const 3)
     (i32.const -1)
    )
   )
  )
  (if
   (i32.le_u
    (local.get $3)
    (local.get $5)
   )
   (block
    (call $~lib/rt/tlsf/prepareBlock
     (local.get $0)
     (local.get $1)
     (local.get $3)
    )
    (drop
     (i32.const 0)
    )
    (return
     (local.get $1)
    )
    (unreachable)
   )
  )
  (local.set $7
   (block $~lib/rt/tlsf/GETRIGHT|inlined.4 (result i32)
    (local.set $6
     (local.get $1)
    )
    (i32.add
     (i32.add
      (local.get $6)
      (i32.const 4)
     )
     (i32.and
      (i32.load
       (local.get $6)
      )
      (i32.xor
       (i32.const 3)
       (i32.const -1)
      )
     )
    )
   )
  )
  (local.set $8
   (i32.load
    (local.get $7)
   )
  )
  (if
   (i32.and
    (local.get $8)
    (i32.const 1)
   )
   (block
    (local.set $6
     (i32.add
      (i32.add
       (local.get $5)
       (i32.const 4)
      )
      (i32.and
       (local.get $8)
       (i32.xor
        (i32.const 3)
        (i32.const -1)
       )
      )
     )
    )
    (if
     (i32.ge_u
      (local.get $6)
      (local.get $3)
     )
     (block
      (call $~lib/rt/tlsf/removeBlock
       (local.get $0)
       (local.get $7)
      )
      (i32.store
       (local.get $1)
       (i32.or
        (i32.and
         (local.get $4)
         (i32.const 3)
        )
        (local.get $6)
       )
      )
      (call $~lib/rt/tlsf/prepareBlock
       (local.get $0)
       (local.get $1)
       (local.get $3)
      )
      (drop
       (i32.const 0)
      )
      (return
       (local.get $1)
      )
      (unreachable)
     )
    )
   )
  )
  (call $~lib/rt/tlsf/moveBlock
   (local.get $0)
   (local.get $1)
   (local.get $2)
  )
 )
 (func $~lib/rt/tlsf/__realloc (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.eqz
    (global.get $~lib/rt/tlsf/ROOT)
   )
   (call $~lib/rt/tlsf/initialize)
  )
  (i32.add
   (if (result i32)
    (i32.lt_u
     (local.get $0)
     (global.get $~lib/memory/__heap_base)
    )
    (call $~lib/rt/tlsf/moveBlock
     (global.get $~lib/rt/tlsf/ROOT)
     (call $~lib/rt/tlsf/checkUsedBlock
      (local.get $0)
     )
     (local.get $1)
    )
    (call $~lib/rt/tlsf/reallocateBlock
     (global.get $~lib/rt/tlsf/ROOT)
     (call $~lib/rt/tlsf/checkUsedBlock
      (local.get $0)
     )
     (local.get $1)
    )
   )
   (i32.const 4)
  )
 )
 (func $~lib/rt/pure/__renew (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $1)
    (i32.const 1073741804)
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 32)
      (i32.const 96)
      (i32.const 288)
      (i32.const 30)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (local.set $2
   (call $~lib/rt/tlsf/__realloc
    (i32.sub
     (local.get $0)
     (i32.const 16)
    )
    (i32.add
     (i32.const 16)
     (local.get $1)
    )
   )
  )
  (i32.store offset=16
   (i32.sub
    (local.get $2)
    (i32.const 4)
   )
   (local.get $1)
  )
  (i32.add
   (local.get $2)
   (i32.const 16)
  )
 )
 (func $~lib/rt/pure/increment (param $0 i32)
  (local $1 i32)
  (local.set $1
   (i32.load offset=4
    (local.get $0)
   )
  )
  (if
   (i32.eqz
    (i32.eq
     (i32.and
      (local.get $1)
      (i32.xor
       (i32.const 268435455)
       (i32.const -1)
      )
     )
     (i32.and
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
      (i32.xor
       (i32.const 268435455)
       (i32.const -1)
      )
     )
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 96)
     (i32.const 109)
     (i32.const 3)
    )
    (unreachable)
   )
  )
  (i32.store offset=4
   (local.get $0)
   (i32.add
    (local.get $1)
    (i32.const 1)
   )
  )
  (drop
   (i32.const 0)
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.eqz
     (i32.and
      (i32.load
       (local.get $0)
      )
      (i32.const 1)
     )
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 96)
     (i32.const 112)
     (i32.const 14)
    )
    (unreachable)
   )
  )
 )
 (func $~lib/rt/pure/__retain (param $0 i32) (result i32)
  (if
   (i32.gt_u
    (local.get $0)
    (global.get $~lib/memory/__heap_base)
   )
   (call $~lib/rt/pure/increment
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
  )
  (local.get $0)
 )
 (func $~lib/rt/pure/__release (param $0 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (global.get $~lib/memory/__heap_base)
   )
   (call $~lib/rt/pure/decrement
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
  )
 )
 (func $assembly/utils/Log/Logger#constructor (param $0 i32) (result i32)
  (if
   (i32.eqz
    (local.get $0)
   )
   (local.set $0
    (call $~lib/rt/pure/__retain
     (call $~lib/rt/pure/__new
      (i32.const 0)
      (i32.const 4)
     )
    )
   )
  )
  (local.get $0)
 )
 (func $start:assembly/utils/Log
  (local $0 i32)
  (local $1 i32)
  (global.set $assembly/utils/Log/Log
   (call $assembly/utils/Log/Logger#constructor
    (i32.const 0)
   )
  )
 )
 (func $assembly/buildins/Msg/Msg#constructor (param $0 i32) (result i32)
  (if
   (i32.eqz
    (local.get $0)
   )
   (local.set $0
    (call $~lib/rt/pure/__retain
     (call $~lib/rt/pure/__new
      (i32.const 17)
      (i32.const 5)
     )
    )
   )
  )
  (i32.store
   (local.get $0)
   (call $~lib/rt/pure/__retain
    (i32.const 0)
   )
  )
  (i32.store offset=4
   (local.get $0)
   (call $~lib/rt/pure/__retain
    (i32.const 0)
   )
  )
  (i32.store offset=8
   (local.get $0)
   (call $~lib/rt/pure/__retain
    (i32.const 0)
   )
  )
  (i32.store offset=12
   (local.get $0)
   (call $~lib/rt/pure/__retain
    (i32.const 0)
   )
  )
  (i32.store8 offset=16
   (local.get $0)
   (i32.const 1)
  )
  (local.get $0)
 )
 (func $start:examples/flipper/flipper
  (call $start:assembly/utils/Log)
  (global.set $examples/flipper/flipper/msg
   (call $assembly/buildins/Msg/Msg#constructor
    (i32.const 0)
   )
  )
 )
 (func $~lib/rt/__newBuffer (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local.set $3
   (call $~lib/rt/pure/__new
    (local.get $0)
    (local.get $1)
   )
  )
  (if
   (local.get $2)
   (call $~lib/memory/memory.copy
    (local.get $3)
    (local.get $2)
    (local.get $0)
   )
  )
  (local.get $3)
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $4
   (call $~lib/rt/pure/__new
    (i32.const 16)
    (local.get $2)
   )
  )
  (local.set $5
   (i32.shl
    (local.get $0)
    (local.get $1)
   )
  )
  (local.set $6
   (call $~lib/rt/__newBuffer
    (local.get $5)
    (i32.const 0)
    (local.get $3)
   )
  )
  (i32.store
   (local.get $4)
   (call $~lib/rt/pure/__retain
    (local.get $6)
   )
  )
  (i32.store offset=4
   (local.get $4)
   (local.get $6)
  )
  (i32.store offset=8
   (local.get $4)
   (local.get $5)
  )
  (i32.store offset=12
   (local.get $4)
   (local.get $0)
  )
  (local.get $4)
 )
 (func $examples/flipper/flipper/Stored#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 13)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store
   (local.tee $1
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $2
       (i32.const 0)
      )
      (local.tee $3
       (i32.load
        (local.get $1)
       )
      )
     )
     (block
      (local.set $2
       (call $~lib/rt/pure/__retain
        (local.get $2)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $3)
      )
     )
    )
    (local.get $2)
   )
  )
  (local.get $0)
 )
 (func $examples/flipper/flipper/Flipper#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 12)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store
   (local.tee $1
    (local.get $0)
   )
   (block (result i32)
    (local.set $2
     (call $examples/flipper/flipper/Stored#constructor
      (i32.const 0)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $1)
     )
    )
    (local.get $2)
   )
  )
  (local.get $0)
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i64)
  (local $10 i32)
  (block $~lib/util/memory/memset|inlined.0
   (local.set $5
    (local.get $0)
   )
   (local.set $4
    (local.get $1)
   )
   (local.set $3
    (local.get $2)
   )
   (drop
    (i32.gt_s
     (i32.const 0)
     (i32.const 1)
    )
   )
   (block
    (if
     (i32.eqz
      (local.get $3)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (local.set $6
     (i32.sub
      (i32.add
       (local.get $5)
       (local.get $3)
      )
      (i32.const 4)
     )
    )
    (i32.store8
     (local.get $5)
     (local.get $4)
    )
    (i32.store8 offset=3
     (local.get $6)
     (local.get $4)
    )
    (if
     (i32.le_u
      (local.get $3)
      (i32.const 2)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (i32.store8 offset=1
     (local.get $5)
     (local.get $4)
    )
    (i32.store8 offset=2
     (local.get $5)
     (local.get $4)
    )
    (i32.store8 offset=2
     (local.get $6)
     (local.get $4)
    )
    (i32.store8 offset=1
     (local.get $6)
     (local.get $4)
    )
    (if
     (i32.le_u
      (local.get $3)
      (i32.const 6)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (i32.store8 offset=3
     (local.get $5)
     (local.get $4)
    )
    (i32.store8
     (local.get $6)
     (local.get $4)
    )
    (if
     (i32.le_u
      (local.get $3)
      (i32.const 8)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (local.set $7
     (i32.and
      (i32.sub
       (i32.const 0)
       (local.get $5)
      )
      (i32.const 3)
     )
    )
    (local.set $5
     (i32.add
      (local.get $5)
      (local.get $7)
     )
    )
    (local.set $3
     (i32.sub
      (local.get $3)
      (local.get $7)
     )
    )
    (local.set $3
     (i32.and
      (local.get $3)
      (i32.const -4)
     )
    )
    (local.set $8
     (i32.mul
      (i32.div_u
       (i32.const -1)
       (i32.const 255)
      )
      (i32.and
       (local.get $4)
       (i32.const 255)
      )
     )
    )
    (local.set $6
     (i32.sub
      (i32.add
       (local.get $5)
       (local.get $3)
      )
      (i32.const 28)
     )
    )
    (i32.store
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=24
     (local.get $6)
     (local.get $8)
    )
    (if
     (i32.le_u
      (local.get $3)
      (i32.const 8)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (i32.store offset=4
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=8
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=16
     (local.get $6)
     (local.get $8)
    )
    (i32.store offset=20
     (local.get $6)
     (local.get $8)
    )
    (if
     (i32.le_u
      (local.get $3)
      (i32.const 24)
     )
     (block
      (br $~lib/util/memory/memset|inlined.0)
      (unreachable)
     )
    )
    (i32.store offset=12
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=16
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=20
     (local.get $5)
     (local.get $8)
    )
    (i32.store offset=24
     (local.get $5)
     (local.get $8)
    )
    (i32.store
     (local.get $6)
     (local.get $8)
    )
    (i32.store offset=4
     (local.get $6)
     (local.get $8)
    )
    (i32.store offset=8
     (local.get $6)
     (local.get $8)
    )
    (i32.store offset=12
     (local.get $6)
     (local.get $8)
    )
    (local.set $7
     (i32.add
      (i32.const 24)
      (i32.and
       (local.get $5)
       (i32.const 4)
      )
     )
    )
    (local.set $5
     (i32.add
      (local.get $5)
      (local.get $7)
     )
    )
    (local.set $3
     (i32.sub
      (local.get $3)
      (local.get $7)
     )
    )
    (local.set $9
     (i64.or
      (i64.extend_i32_u
       (local.get $8)
      )
      (i64.shl
       (i64.extend_i32_u
        (local.get $8)
       )
       (i64.const 32)
      )
     )
    )
    (block $while-break|0
     (loop $while-continue|0
      (local.set $10
       (i32.ge_u
        (local.get $3)
        (i32.const 32)
       )
      )
      (if
       (local.get $10)
       (block
        (i64.store
         (local.get $5)
         (local.get $9)
        )
        (i64.store offset=8
         (local.get $5)
         (local.get $9)
        )
        (i64.store offset=16
         (local.get $5)
         (local.get $9)
        )
        (i64.store offset=24
         (local.get $5)
         (local.get $9)
        )
        (local.set $3
         (i32.sub
          (local.get $3)
          (i32.const 32)
         )
        )
        (local.set $5
         (i32.add
          (local.get $5)
          (i32.const 32)
         )
        )
        (br $while-continue|0)
       )
      )
     )
    )
   )
  )
 )
 (func $~lib/arraybuffer/ArrayBufferView#constructor (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 12)
       (i32.const 2)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=8
    (local.get $0)
    (i32.const 0)
   )
  )
  (if
   (i32.gt_u
    (local.get $1)
    (i32.shr_u
     (i32.const 1073741820)
     (local.get $2)
    )
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 944)
      (i32.const 992)
      (i32.const 18)
      (i32.const 57)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (local.set $3
   (call $~lib/rt/pure/__new
    (local.tee $1
     (i32.shl
      (local.get $1)
      (local.get $2)
     )
    )
    (i32.const 0)
   )
  )
  (call $~lib/memory/memory.fill
   (local.get $3)
   (i32.const 0)
   (local.get $1)
  )
  (i32.store
   (local.tee $4
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $5
       (local.get $3)
      )
      (local.tee $6
       (i32.load
        (local.get $4)
       )
      )
     )
     (block
      (local.set $5
       (call $~lib/rt/pure/__retain
        (local.get $5)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $6)
      )
     )
    )
    (local.get $5)
   )
  )
  (i32.store offset=4
   (local.get $0)
   (local.get $3)
  )
  (i32.store offset=8
   (local.get $0)
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/typedarray/Uint8Array#constructor (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.eqz
    (local.get $0)
   )
   (local.set $0
    (call $~lib/rt/pure/__retain
     (call $~lib/rt/pure/__new
      (i32.const 12)
      (i32.const 19)
     )
    )
   )
  )
  (local.set $0
   (call $~lib/arraybuffer/ArrayBufferView#constructor
    (local.get $0)
    (local.get $1)
    (i32.const 0)
   )
  )
  (local.get $0)
 )
 (func $~lib/typedarray/Uint8Array#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=8
     (local.get $0)
    )
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 1056)
      (i32.const 1120)
      (i32.const 163)
      (i32.const 45)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (i32.store8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
   (local.get $2)
  )
 )
 (func $assembly/primitives/sizebuffer/SizeBuffer#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 20)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $~lib/typedarray/Uint8Array#constructor
      (i32.const 0)
      (i32.const 4)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (local.set $2
   (i32.const 0)
  )
  (block $for-break0
   (loop $for-loop|0
    (local.set $3
     (i32.lt_s
      (local.get $2)
      (i32.const 4)
     )
    )
    (if
     (local.get $3)
     (block
      (block $for-continue|0
       (call $~lib/typedarray/Uint8Array#__set
        (i32.load
         (local.get $0)
        )
        (local.get $2)
        (i32.and
         (i32.shr_u
          (local.get $1)
          (i32.mul
           (local.get $2)
           (i32.const 8)
          )
         )
         (i32.const 255)
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
  (local.get $0)
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 8)
       (i32.const 18)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $~lib/typedarray/Uint8Array#constructor
      (i32.const 0)
      (local.get $1)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (i32.store offset=4
   (local.tee $3
    (local.get $0)
   )
   (block (result i32)
    (local.set $2
     (call $assembly/primitives/sizebuffer/SizeBuffer#constructor
      (i32.const 0)
      (local.get $1)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load offset=4
      (local.get $3)
     )
    )
    (local.get $2)
   )
  )
  (local.get $0)
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer (param $0 i32) (result i32)
  (call $~lib/rt/pure/__retain
   (i32.load
    (i32.load
     (local.get $0)
    )
   )
  )
 )
 (func $assembly/primitives/sizebuffer/SizeBuffer#get:buffer (param $0 i32) (result i32)
  (call $~lib/rt/pure/__retain
   (i32.load
    (i32.load
     (local.get $0)
    )
   )
  )
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#get:sizeBuffer (param $0 i32) (result i32)
  (local $1 i32)
  (local.tee $1
   (call $assembly/primitives/sizebuffer/SizeBuffer#get:buffer
    (i32.load offset=4
     (local.get $0)
    )
   )
  )
 )
 (func $assembly/primitives/inputdata/MessageInputReader#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 17)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $assembly/primitives/readbuffer/ReadBuffer#constructor
      (i32.const 0)
      (local.get $1)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (call $assembly/seal/seal0/seal_input
   (local.tee $2
    (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
     (i32.load
      (local.get $0)
     )
    )
   )
   (local.tee $3
    (call $assembly/primitives/readbuffer/ReadBuffer#get:sizeBuffer
     (i32.load
      (local.get $0)
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (local.get $0)
 )
 (func $assembly/primitives/inputdata/MessageInputReader.readInput (result i32)
  (call $assembly/primitives/inputdata/MessageInputReader#constructor
   (i32.const 0)
   (i32.const 1024)
  )
 )
 (func $~lib/array/Array<u8>#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 16)
       (i32.const 6)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=8
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=12
    (local.get $0)
    (i32.const 0)
   )
  )
  (if
   (i32.gt_u
    (local.get $1)
    (i32.shr_u
     (i32.const 1073741820)
     (i32.const 0)
    )
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 944)
      (i32.const 1184)
      (i32.const 57)
      (i32.const 60)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (local.set $2
   (i32.shl
    (local.get $1)
    (i32.const 0)
   )
  )
  (local.set $3
   (call $~lib/rt/pure/__new
    (local.get $2)
    (i32.const 0)
   )
  )
  (call $~lib/memory/memory.fill
   (local.get $3)
   (i32.const 0)
   (local.get $2)
  )
  (i32.store
   (local.tee $4
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $5
       (local.get $3)
      )
      (local.tee $6
       (i32.load
        (local.get $4)
       )
      )
     )
     (block
      (local.set $5
       (call $~lib/rt/pure/__retain
        (local.get $5)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $6)
      )
     )
    )
    (local.get $5)
   )
  )
  (i32.store offset=4
   (local.get $0)
   (local.get $3)
  )
  (i32.store offset=8
   (local.get $0)
   (local.get $2)
  )
  (i32.store offset=12
   (local.get $0)
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/typedarray/Uint8Array#__get (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=8
     (local.get $0)
    )
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 1056)
      (i32.const 1120)
      (i32.const 152)
      (i32.const 45)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (i32.load8_u
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
  )
 )
 (func $assembly/primitives/sizebuffer/SizeBuffer#get:value (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (i32.const 0)
  )
  (local.set $2
   (i32.const 3)
  )
  (block $for-break0
   (loop $for-loop|0
    (local.set $3
     (i32.ge_s
      (local.get $2)
      (i32.const 0)
     )
    )
    (if
     (local.get $3)
     (block
      (block $for-continue|0
       (local.set $1
        (i32.or
         (i32.shl
          (call $~lib/typedarray/Uint8Array#__get
           (i32.load
            (local.get $0)
           )
           (local.get $2)
          )
          (i32.mul
           (local.get $2)
           (i32.const 8)
          )
         )
         (local.get $1)
        )
       )
      )
      (local.set $2
       (i32.sub
        (local.get $2)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
  (local.get $1)
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#get:readSize (param $0 i32) (result i32)
  (call $assembly/primitives/sizebuffer/SizeBuffer#get:value
   (i32.load offset=4
    (local.get $0)
   )
  )
 )
 (func $~lib/typedarray/Uint8Array#get:length (param $0 i32) (result i32)
  (i32.load offset=8
   (local.get $0)
  )
 )
 (func $assembly/utils/ArrayUtils/typedToArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (if (result i32)
    (i32.eq
     (local.get $1)
     (i32.const -1)
    )
    (call $~lib/typedarray/Uint8Array#get:length
     (local.get $0)
    )
    (local.get $1)
   )
  )
  (local.set $3
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (local.get $2)
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load
    (local.get $3)
   )
   (i32.load
    (local.get $0)
   )
   (local.get $2)
  )
  (local.set $4
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $4)
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#toU8a (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (local.set $2
   (call $assembly/utils/ArrayUtils/typedToArray
    (local.get $1)
    (call $assembly/primitives/readbuffer/ReadBuffer#get:readSize
     (local.get $0)
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $2)
 )
 (func $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes (param $0 i32) (result i32)
  (call $assembly/primitives/readbuffer/ReadBuffer#toU8a
   (local.get $0)
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $~lib/array/Array<u8>#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local.set $3
   (i32.load offset=12
    (local.get $0)
   )
  )
  (local.set $1
   (if (result i32)
    (i32.lt_s
     (local.get $1)
     (i32.const 0)
    )
    (select
     (local.tee $4
      (i32.add
       (local.get $1)
       (local.get $3)
      )
     )
     (local.tee $5
      (i32.const 0)
     )
     (i32.gt_s
      (local.get $4)
      (local.get $5)
     )
    )
    (select
     (local.tee $5
      (local.get $1)
     )
     (local.tee $4
      (local.get $3)
     )
     (i32.lt_s
      (local.get $5)
      (local.get $4)
     )
    )
   )
  )
  (local.set $2
   (if (result i32)
    (i32.lt_s
     (local.get $2)
     (i32.const 0)
    )
    (select
     (local.tee $4
      (i32.add
       (local.get $2)
       (local.get $3)
      )
     )
     (local.tee $5
      (i32.const 0)
     )
     (i32.gt_s
      (local.get $4)
      (local.get $5)
     )
    )
    (select
     (local.tee $5
      (local.get $2)
     )
     (local.tee $4
      (local.get $3)
     )
     (i32.lt_s
      (local.get $5)
      (local.get $4)
     )
    )
   )
  )
  (local.set $3
   (select
    (local.tee $4
     (i32.sub
      (local.get $2)
      (local.get $1)
     )
    )
    (local.tee $5
     (i32.const 0)
    )
    (i32.gt_s
     (local.get $4)
     (local.get $5)
    )
   )
  )
  (local.set $6
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (local.get $3)
     (i32.const 0)
     (i32.const 6)
     (i32.const 0)
    )
   )
  )
  (local.set $7
   (i32.load offset=4
    (local.get $6)
   )
  )
  (local.set $8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (i32.shl
     (local.get $1)
     (i32.const 0)
    )
   )
  )
  (drop
   (i32.const 0)
  )
  (call $~lib/memory/memory.copy
   (local.get $7)
   (local.get $8)
   (i32.shl
    (local.get $3)
    (i32.const 0)
   )
  )
  (local.get $6)
 )
 (func $assembly/primitives/inputdata/MessageInputReader#get:fnSelector (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $2
   (call $~lib/array/Array<u8>#slice
    (local.tee $1
     (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
      (i32.load
       (local.get $0)
      )
     )
    )
    (i32.const 0)
    (i32.const 4)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $2)
 )
 (func $~lib/array/Array<u8>#get:length (param $0 i32) (result i32)
  (i32.load offset=12
   (local.get $0)
  )
 )
 (func $assembly/primitives/inputdata/MessageInputReader#get:fnParameters (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.eq
    (call $~lib/array/Array<u8>#get:length
     (local.tee $1
      (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
       (i32.load
        (local.get $0)
       )
      )
     )
    )
    (i32.const 4)
   )
   (block
    (block
     (local.set $3
      (call $~lib/rt/pure/__retain
       (call $~lib/rt/__newArray
        (i32.const 0)
        (i32.const 0)
        (i32.const 6)
        (i32.const 1376)
       )
      )
     )
     (call $~lib/rt/pure/__release
      (local.get $1)
     )
     (return
      (local.get $3)
     )
    )
    (unreachable)
   )
  )
  (local.set $2
   (call $~lib/array/Array<u8>#slice
    (local.tee $3
     (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
      (i32.load
       (local.get $0)
      )
     )
    )
    (i32.const 4)
    (global.get $~lib/builtins/i32.MAX_VALUE)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (local.get $2)
 )
 (func $assembly/buildins/Msg/Msg#init_sig_and_data (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (if (result i32)
    (i32.eq
     (i32.load offset=8
      (local.get $0)
     )
     (i32.const 0)
    )
    (i32.const 1)
    (i32.eq
     (i32.load offset=12
      (local.get $0)
     )
     (i32.const 0)
    )
   )
   (block
    (local.set $1
     (call $assembly/primitives/inputdata/MessageInputReader.readInput)
    )
    (if
     (i32.eq
      (i32.load offset=8
       (local.get $0)
      )
      (i32.const 0)
     )
     (block
      (i32.store offset=8
       (local.tee $2
        (local.get $0)
       )
       (block (result i32)
        (local.set $3
         (call $~lib/array/Array<u8>#constructor
          (i32.const 0)
          (i32.const 4)
         )
        )
        (call $~lib/rt/pure/__release
         (i32.load offset=8
          (local.get $2)
         )
        )
        (local.get $3)
       )
      )
      (call $~lib/memory/memory.copy
       (i32.load
        (if (result i32)
         (local.tee $2
          (i32.load offset=8
           (local.get $0)
          )
         )
         (local.get $2)
         (block
          (call $~lib/builtins/abort
           (i32.const 1232)
           (i32.const 1296)
           (i32.const 77)
           (i32.const 29)
          )
          (unreachable)
         )
        )
       )
       (i32.load
        (local.tee $2
         (call $assembly/primitives/inputdata/MessageInputReader#get:fnSelector
          (local.get $1)
         )
        )
       )
       (i32.const 4)
      )
      (call $~lib/rt/pure/__release
       (local.get $2)
      )
     )
    )
    (local.set $3
     (call $~lib/array/Array<u8>#get:length
      (local.tee $2
       (call $assembly/primitives/inputdata/MessageInputReader#get:fnParameters
        (local.get $1)
       )
      )
     )
    )
    (if
     (i32.eq
      (i32.load offset=12
       (local.get $0)
      )
      (i32.const 0)
     )
     (if
      (i32.gt_s
       (local.get $3)
       (i32.const 0)
      )
      (block
       (i32.store offset=12
        (local.tee $4
         (local.get $0)
        )
        (block (result i32)
         (local.set $5
          (call $~lib/array/Array<u8>#constructor
           (i32.const 0)
           (local.get $3)
          )
         )
         (call $~lib/rt/pure/__release
          (i32.load offset=12
           (local.get $4)
          )
         )
         (local.get $5)
        )
       )
       (call $~lib/memory/memory.copy
        (i32.load
         (if (result i32)
          (local.tee $4
           (i32.load offset=12
            (local.get $0)
           )
          )
          (local.get $4)
          (block
           (call $~lib/builtins/abort
            (i32.const 1232)
            (i32.const 1296)
            (i32.const 87)
            (i32.const 31)
           )
           (unreachable)
          )
         )
        )
        (i32.load
         (local.tee $4
          (call $assembly/primitives/inputdata/MessageInputReader#get:fnParameters
           (local.get $1)
          )
         )
        )
        (local.get $3)
       )
       (call $~lib/rt/pure/__release
        (local.get $4)
       )
      )
      (i32.store offset=12
       (local.tee $4
        (local.get $0)
       )
       (block (result i32)
        (local.set $5
         (call $~lib/rt/pure/__retain
          (call $~lib/rt/__newArray
           (i32.const 0)
           (i32.const 0)
           (i32.const 6)
           (i32.const 1408)
          )
         )
        )
        (call $~lib/rt/pure/__release
         (i32.load offset=12
          (local.get $4)
         )
        )
        (local.get $5)
       )
      )
     )
    )
    (call $~lib/rt/pure/__release
     (local.get $1)
    )
    (call $~lib/rt/pure/__release
     (local.get $2)
    )
   )
  )
 )
 (func $assembly/buildins/Msg/Msg#get:sig (param $0 i32) (result i32)
  (local $1 i32)
  (if
   (i32.eq
    (i32.load offset=8
     (local.get $0)
    )
    (i32.const 0)
   )
   (call $assembly/buildins/Msg/Msg#init_sig_and_data
    (local.get $0)
   )
  )
  (call $~lib/rt/pure/__retain
   (if (result i32)
    (local.tee $1
     (i32.load offset=8
      (local.get $0)
     )
    )
    (local.get $1)
    (block
     (call $~lib/builtins/abort
      (i32.const 1232)
      (i32.const 1296)
      (i32.const 45)
      (i32.const 12)
     )
     (unreachable)
    )
   )
  )
 )
 (func $assembly/buildins/Msg/Msg#isSelector (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (if
   (i32.ne
    (call $~lib/array/Array<u8>#get:length
     (local.tee $2
      (call $assembly/buildins/Msg/Msg#get:sig
       (local.get $0)
      )
     )
    )
    (call $~lib/array/Array<u8>#get:length
     (local.get $1)
    )
   )
   (block
    (block
     (local.set $3
      (i32.const 0)
     )
     (call $~lib/rt/pure/__release
      (local.get $1)
     )
     (call $~lib/rt/pure/__release
      (local.get $2)
     )
     (return
      (local.get $3)
     )
    )
    (unreachable)
   )
  )
  (local.set $6
   (i32.eq
    (block $~lib/memory/memory.compare|inlined.0 (result i32)
     (local.set $6
      (i32.load
       (local.tee $3
        (call $assembly/buildins/Msg/Msg#get:sig
         (local.get $0)
        )
       )
      )
     )
     (local.set $5
      (i32.load
       (local.get $1)
      )
     )
     (local.set $4
      (i32.const 4)
     )
     (block $~lib/util/memory/memcmp|inlined.0 (result i32)
      (local.set $9
       (local.get $6)
      )
      (local.set $8
       (local.get $5)
      )
      (local.set $7
       (local.get $4)
      )
      (if
       (i32.eq
        (local.get $9)
        (local.get $8)
       )
       (block
        (br $~lib/util/memory/memcmp|inlined.0
         (i32.const 0)
        )
        (unreachable)
       )
      )
      (drop
       (i32.lt_s
        (i32.const 0)
        (i32.const 2)
       )
      )
      (if
       (i32.eq
        (i32.and
         (local.get $9)
         (i32.const 7)
        )
        (i32.and
         (local.get $8)
         (i32.const 7)
        )
       )
       (block
        (block $while-break|0
         (loop $while-continue|0
          (local.set $10
           (i32.and
            (local.get $9)
            (i32.const 7)
           )
          )
          (if
           (local.get $10)
           (block
            (if
             (i32.eqz
              (local.get $7)
             )
             (block
              (br $~lib/util/memory/memcmp|inlined.0
               (i32.const 0)
              )
              (unreachable)
             )
            )
            (local.set $11
             (i32.load8_u
              (local.get $9)
             )
            )
            (local.set $12
             (i32.load8_u
              (local.get $8)
             )
            )
            (if
             (i32.ne
              (local.get $11)
              (local.get $12)
             )
             (block
              (br $~lib/util/memory/memcmp|inlined.0
               (i32.sub
                (local.get $11)
                (local.get $12)
               )
              )
              (unreachable)
             )
            )
            (local.set $7
             (i32.sub
              (local.get $7)
              (i32.const 1)
             )
            )
            (local.set $9
             (i32.add
              (local.get $9)
              (i32.const 1)
             )
            )
            (local.set $8
             (i32.add
              (local.get $8)
              (i32.const 1)
             )
            )
            (br $while-continue|0)
           )
          )
         )
        )
        (block $while-break|1
         (loop $while-continue|1
          (local.set $10
           (i32.ge_u
            (local.get $7)
            (i32.const 8)
           )
          )
          (if
           (local.get $10)
           (block
            (if
             (i64.ne
              (i64.load
               (local.get $9)
              )
              (i64.load
               (local.get $8)
              )
             )
             (block
              (br $while-break|1)
              (unreachable)
             )
            )
            (local.set $9
             (i32.add
              (local.get $9)
              (i32.const 8)
             )
            )
            (local.set $8
             (i32.add
              (local.get $8)
              (i32.const 8)
             )
            )
            (local.set $7
             (i32.sub
              (local.get $7)
              (i32.const 8)
             )
            )
            (br $while-continue|1)
           )
          )
         )
        )
       )
      )
      (block $while-break|2
       (loop $while-continue|2
        (local.set $10
         (block (result i32)
          (local.set $7
           (i32.sub
            (local.tee $10
             (local.get $7)
            )
            (i32.const 1)
           )
          )
          (local.get $10)
         )
        )
        (if
         (local.get $10)
         (block
          (local.set $13
           (i32.load8_u
            (local.get $9)
           )
          )
          (local.set $14
           (i32.load8_u
            (local.get $8)
           )
          )
          (if
           (i32.ne
            (local.get $13)
            (local.get $14)
           )
           (block
            (br $~lib/util/memory/memcmp|inlined.0
             (i32.sub
              (local.get $13)
              (local.get $14)
             )
            )
            (unreachable)
           )
          )
          (local.set $9
           (i32.add
            (local.get $9)
            (i32.const 1)
           )
          )
          (local.set $8
           (i32.add
            (local.get $8)
            (i32.const 1)
           )
          )
          (br $while-continue|2)
         )
        )
       )
      )
      (i32.const 0)
     )
    )
    (i32.const 0)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $6)
 )
 (func $assembly/buildins/FnParameters/FnParameters#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 8)
       (i32.const 21)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (i32.store offset=4
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $3
       (local.get $1)
      )
      (local.tee $4
       (i32.load offset=4
        (local.get $2)
       )
      )
     )
     (block
      (local.set $3
       (call $~lib/rt/pure/__retain
        (local.get $3)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $4)
      )
     )
    )
    (local.get $3)
   )
  )
  (i32.store
   (local.get $0)
   (i32.const 0)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $0)
 )
 (func $assembly/buildins/Msg/Msg#get:data (param $0 i32) (result i32)
  (local $1 i32)
  (if
   (i32.eq
    (i32.load offset=12
     (local.get $0)
    )
    (i32.const 0)
   )
   (call $assembly/buildins/Msg/Msg#init_sig_and_data
    (local.get $0)
   )
  )
  (call $~lib/rt/pure/__retain
   (if (result i32)
    (local.tee $1
     (i32.load offset=12
      (local.get $0)
     )
    )
    (local.get $1)
    (block
     (call $~lib/builtins/abort
      (i32.const 1232)
      (i32.const 1296)
      (i32.const 52)
      (i32.const 12)
     )
     (unreachable)
    )
   )
  )
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool#constructor (param $0 i32) (param $1 i32) (result i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 1)
       (i32.const 14)
      )
     )
    )
   )
   (i32.store8
    (local.get $0)
    (i32.const 0)
   )
  )
  (i32.store8
   (local.get $0)
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/array/Array<u8>#__uget (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (i32.shl
     (local.get $1)
     (i32.const 0)
    )
   )
  )
 )
 (func $~lib/array/Array<u8>#__get (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (block
    (block
     (call $~lib/builtins/abort
      (i32.const 1056)
      (i32.const 1184)
      (i32.const 104)
      (i32.const 42)
     )
     (unreachable)
    )
    (unreachable)
   )
  )
  (local.set $2
   (call $~lib/array/Array<u8>#__uget
    (local.get $0)
    (local.get $1)
   )
  )
  (drop
   (i32.const 0)
  )
  (local.get $2)
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool#populateFromBytes (param $0 i32) (param $1 i32) (param $2 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (if
   (i32.eqz
    (if (result i32)
     (i32.gt_s
      (call $~lib/array/Array<u8>#get:length
       (local.get $1)
      )
      (i32.const 0)
     )
     (if (result i32)
      (i32.eq
       (call $~lib/array/Array<u8>#__get
        (local.get $1)
        (local.get $2)
       )
       (i32.const 1)
      )
      (i32.const 1)
      (i32.eq
       (call $~lib/array/Array<u8>#__get
        (local.get $1)
        (local.get $2)
       )
       (i32.const 0)
      )
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 1440)
     (i32.const 1536)
     (i32.const 49)
     (i32.const 9)
    )
    (unreachable)
   )
  )
  (i32.store8
   (local.get $0)
   (i32.eq
    (call $~lib/array/Array<u8>#__get
     (local.get $1)
     (local.get $2)
    )
    (i32.const 1)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool#encodedLength (param $0 i32) (result i32)
  (i32.const 1)
 )
 (func $assembly/buildins/FnParameters/FnParameters#get<assembly/deps/as-scale-codec/Bool/Bool> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $2
   (call $~lib/rt/pure/__retain
    (local.tee $1
     (call $assembly/deps/as-scale-codec/Bool/Bool#constructor
      (i32.const 0)
      (i32.const 0)
     )
    )
   )
  )
  (call $assembly/deps/as-scale-codec/Bool/Bool#populateFromBytes
   (local.get $2)
   (i32.load offset=4
    (local.get $0)
   )
   (i32.load
    (local.get $0)
   )
  )
  (i32.store
   (local.get $0)
   (i32.add
    (i32.load
     (local.get $0)
    )
    (call $assembly/deps/as-scale-codec/Bool/Bool#encodedLength
     (local.get $2)
    )
   )
  )
  (local.set $3
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $3)
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool#unwrap (param $0 i32) (result i32)
  (i32.load8_u
   (local.get $0)
  )
 )
 (func $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 22)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $3
       (local.get $1)
      )
      (local.tee $4
       (i32.load
        (local.get $2)
       )
      )
     )
     (block
      (local.set $3
       (call $~lib/rt/pure/__retain
        (local.get $3)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $4)
      )
     )
    )
    (local.get $3)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/arraybuffer/ArrayBuffer#get:byteLength (param $0 i32) (result i32)
  (i32.load offset=16
   (i32.sub
    (local.get $0)
    (i32.const 20)
   )
  )
 )
 (func $~lib/typedarray/Uint8Array.wrap (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $8
   (block $~lib/typedarray/WRAP<~lib/typedarray/Uint8Array,u8>|inlined.0 (result i32)
    (local.set $5
     (call $~lib/rt/pure/__retain
      (local.get $0)
     )
    )
    (local.set $4
     (local.get $1)
    )
    (local.set $3
     (local.get $2)
    )
    (local.set $7
     (call $~lib/arraybuffer/ArrayBuffer#get:byteLength
      (local.get $5)
     )
    )
    (if
     (i32.or
      (i32.gt_u
       (local.get $4)
       (local.get $7)
      )
      (i32.and
       (local.get $4)
       (i32.const 0)
      )
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 1056)
       (i32.const 1120)
       (i32.const 1741)
       (i32.const 5)
      )
      (unreachable)
      (unreachable)
     )
    )
    (if
     (i32.lt_s
      (local.get $3)
      (i32.const 0)
     )
     (if
      (i32.eq
       (local.get $3)
       (i32.const -1)
      )
      (block
       (if
        (i32.and
         (local.get $7)
         (i32.const 0)
        )
        (block
         (call $~lib/builtins/abort
          (i32.const 944)
          (i32.const 1120)
          (i32.const 1746)
          (i32.const 9)
         )
         (unreachable)
         (unreachable)
        )
       )
       (local.set $6
        (i32.sub
         (local.get $7)
         (local.get $4)
        )
       )
      )
      (block
       (call $~lib/builtins/abort
        (i32.const 944)
        (i32.const 1120)
        (i32.const 1750)
        (i32.const 7)
       )
       (unreachable)
       (unreachable)
      )
     )
     (block
      (local.set $6
       (i32.shl
        (local.get $3)
        (i32.const 0)
       )
      )
      (if
       (i32.gt_s
        (i32.add
         (local.get $4)
         (local.get $6)
        )
        (local.get $7)
       )
       (block
        (call $~lib/builtins/abort
         (i32.const 944)
         (i32.const 1120)
         (i32.const 1755)
         (i32.const 7)
        )
        (unreachable)
        (unreachable)
       )
      )
     )
    )
    (local.set $8
     (call $~lib/rt/pure/__new
      (i32.const 12)
      (i32.const 19)
     )
    )
    (i32.store
     (local.get $8)
     (call $~lib/rt/pure/__retain
      (local.get $5)
     )
    )
    (i32.store offset=8
     (local.get $8)
     (local.get $6)
    )
    (i32.store offset=4
     (local.get $8)
     (i32.add
      (local.get $5)
      (local.get $4)
     )
    )
    (local.set $9
     (call $~lib/rt/pure/__retain
      (local.get $8)
     )
    )
    (call $~lib/rt/pure/__release
     (local.get $5)
    )
    (local.get $9)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $8)
 )
 (func $~lib/typedarray/Uint8Array.wrap@varargs (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (block $2of2
   (block $1of2
    (block $0of2
     (block $outOfRange
      (br_table $0of2 $1of2 $2of2 $outOfRange
       (i32.sub
        (global.get $~argumentsLength)
        (i32.const 1)
       )
      )
     )
     (unreachable)
    )
    (local.set $1
     (i32.const 0)
    )
   )
   (local.set $2
    (i32.const -1)
   )
  )
  (call $~lib/typedarray/Uint8Array.wrap
   (local.get $0)
   (local.get $1)
   (local.get $2)
  )
 )
 (func $assembly/primitives/writebuffer/WriteBuffer#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 23)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $~lib/typedarray/Uint8Array.wrap@varargs
      (local.get $1)
      (i32.const 0)
      (block (result i32)
       (global.set $~argumentsLength
        (i32.const 1)
       )
       (i32.const 0)
      )
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/array/ensureSize (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $3
   (i32.load offset=8
    (local.get $0)
   )
  )
  (if
   (i32.gt_u
    (local.get $1)
    (i32.shr_u
     (local.get $3)
     (local.get $2)
    )
   )
   (block
    (if
     (i32.gt_u
      (local.get $1)
      (i32.shr_u
       (i32.const 1073741820)
       (local.get $2)
      )
     )
     (block
      (block
       (call $~lib/builtins/abort
        (i32.const 944)
        (i32.const 1184)
        (i32.const 14)
        (i32.const 48)
       )
       (unreachable)
      )
      (unreachable)
     )
    )
    (local.set $4
     (i32.load
      (local.get $0)
     )
    )
    (local.set $5
     (i32.shl
      (local.get $1)
      (local.get $2)
     )
    )
    (local.set $6
     (call $~lib/rt/pure/__renew
      (local.get $4)
      (local.get $5)
     )
    )
    (call $~lib/memory/memory.fill
     (i32.add
      (local.get $6)
      (local.get $3)
     )
     (i32.const 0)
     (i32.sub
      (local.get $5)
      (local.get $3)
     )
    )
    (if
     (i32.ne
      (local.get $6)
      (local.get $4)
     )
     (block
      (i32.store
       (local.get $0)
       (local.get $6)
      )
      (i32.store offset=4
       (local.get $0)
       (local.get $6)
      )
     )
    )
    (i32.store offset=8
     (local.get $0)
     (local.get $5)
    )
   )
  )
 )
 (func $~lib/array/Array<u8>#__uset (param $0 i32) (param $1 i32) (param $2 i32)
  (drop
   (i32.const 0)
  )
  (i32.store8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (i32.shl
     (local.get $1)
     (i32.const 0)
    )
   )
   (local.get $2)
  )
 )
 (func $~lib/array/Array<u8>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (block
    (if
     (i32.lt_s
      (local.get $1)
      (i32.const 0)
     )
     (block
      (block
       (call $~lib/builtins/abort
        (i32.const 1056)
        (i32.const 1184)
        (i32.const 120)
        (i32.const 22)
       )
       (unreachable)
      )
      (unreachable)
     )
    )
    (call $~lib/array/ensureSize
     (local.get $0)
     (i32.add
      (local.get $1)
      (i32.const 1)
     )
     (i32.const 0)
    )
    (i32.store offset=12
     (local.get $0)
     (i32.add
      (local.get $1)
      (i32.const 1)
     )
    )
   )
  )
  (call $~lib/array/Array<u8>#__uset
   (local.get $0)
   (local.get $1)
   (local.get $2)
  )
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool#toU8a (param $0 i32) (result i32)
  (local $1 i32)
  (local.set $1
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (i32.const 1)
   )
  )
  (call $~lib/array/Array<u8>#__set
   (local.get $1)
   (i32.const 0)
   (if (result i32)
    (i32.load8_u
     (local.get $0)
    )
    (i32.const 1)
    (i32.const 0)
   )
  )
  (local.get $1)
 )
 (func $~lib/string/String.UTF8.byteLength (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (local.get $0)
  )
  (local.set $3
   (i32.add
    (local.get $2)
    (i32.load offset=16
     (i32.sub
      (local.get $0)
      (i32.const 20)
     )
    )
   )
  )
  (local.set $4
   (i32.ne
    (local.get $1)
    (i32.const 0)
   )
  )
  (block $while-break|0
   (loop $while-continue|0
    (local.set $5
     (i32.lt_u
      (local.get $2)
      (local.get $3)
     )
    )
    (if
     (local.get $5)
     (block
      (local.set $6
       (i32.load16_u
        (local.get $2)
       )
      )
      (if
       (i32.lt_u
        (local.get $6)
        (i32.const 128)
       )
       (block
        (if
         (i32.and
          (local.get $1)
          (i32.eqz
           (local.get $6)
          )
         )
         (block
          (br $while-break|0)
          (unreachable)
         )
        )
        (local.set $4
         (i32.add
          (local.get $4)
          (i32.const 1)
         )
        )
       )
       (if
        (i32.lt_u
         (local.get $6)
         (i32.const 2048)
        )
        (local.set $4
         (i32.add
          (local.get $4)
          (i32.const 2)
         )
        )
        (block
         (if
          (if (result i32)
           (i32.eq
            (i32.and
             (local.get $6)
             (i32.const 64512)
            )
            (i32.const 55296)
           )
           (i32.lt_u
            (i32.add
             (local.get $2)
             (i32.const 2)
            )
            (local.get $3)
           )
           (i32.const 0)
          )
          (if
           (i32.eq
            (i32.and
             (i32.load16_u offset=2
              (local.get $2)
             )
             (i32.const 64512)
            )
            (i32.const 56320)
           )
           (block
            (local.set $4
             (i32.add
              (local.get $4)
              (i32.const 4)
             )
            )
            (local.set $2
             (i32.add
              (local.get $2)
              (i32.const 4)
             )
            )
            (br $while-continue|0)
            (unreachable)
           )
          )
         )
         (local.set $4
          (i32.add
           (local.get $4)
           (i32.const 3)
          )
         )
        )
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 2)
       )
      )
      (br $while-continue|0)
     )
    )
   )
  )
  (local.set $5
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $5)
 )
 (func $~lib/string/String#get:length (param $0 i32) (result i32)
  (i32.shr_u
   (i32.load offset=16
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
   (i32.const 1)
  )
 )
 (func $~lib/string/String.UTF8.encodeUnsafe (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local.set $4
   (i32.add
    (local.get $0)
    (i32.shl
     (local.get $1)
     (i32.const 1)
    )
   )
  )
  (local.set $5
   (local.get $2)
  )
  (block $while-break|0
   (loop $while-continue|0
    (local.set $6
     (i32.lt_u
      (local.get $0)
      (local.get $4)
     )
    )
    (if
     (local.get $6)
     (block
      (local.set $7
       (i32.load16_u
        (local.get $0)
       )
      )
      (if
       (i32.lt_u
        (local.get $7)
        (i32.const 128)
       )
       (block
        (i32.store8
         (local.get $5)
         (local.get $7)
        )
        (local.set $5
         (i32.add
          (local.get $5)
          (i32.const 1)
         )
        )
       )
       (if
        (i32.lt_u
         (local.get $7)
         (i32.const 2048)
        )
        (block
         (local.set $8
          (i32.or
           (i32.shr_u
            (local.get $7)
            (i32.const 6)
           )
           (i32.const 192)
          )
         )
         (local.set $9
          (i32.or
           (i32.and
            (local.get $7)
            (i32.const 63)
           )
           (i32.const 128)
          )
         )
         (i32.store16
          (local.get $5)
          (i32.or
           (i32.shl
            (local.get $9)
            (i32.const 8)
           )
           (local.get $8)
          )
         )
         (local.set $5
          (i32.add
           (local.get $5)
           (i32.const 2)
          )
         )
        )
        (block
         (if
          (if (result i32)
           (i32.eq
            (i32.and
             (local.get $7)
             (i32.const 64512)
            )
            (i32.const 55296)
           )
           (i32.lt_u
            (i32.add
             (local.get $0)
             (i32.const 2)
            )
            (local.get $4)
           )
           (i32.const 0)
          )
          (block
           (local.set $9
            (i32.load16_u offset=2
             (local.get $0)
            )
           )
           (if
            (i32.eq
             (i32.and
              (local.get $9)
              (i32.const 64512)
             )
             (i32.const 56320)
            )
            (block
             (local.set $7
              (i32.or
               (i32.add
                (i32.const 65536)
                (i32.shl
                 (i32.and
                  (local.get $7)
                  (i32.const 1023)
                 )
                 (i32.const 10)
                )
               )
               (i32.and
                (local.get $9)
                (i32.const 1023)
               )
              )
             )
             (local.set $8
              (i32.or
               (i32.shr_u
                (local.get $7)
                (i32.const 18)
               )
               (i32.const 240)
              )
             )
             (local.set $10
              (i32.or
               (i32.and
                (i32.shr_u
                 (local.get $7)
                 (i32.const 12)
                )
                (i32.const 63)
               )
               (i32.const 128)
              )
             )
             (local.set $11
              (i32.or
               (i32.and
                (i32.shr_u
                 (local.get $7)
                 (i32.const 6)
                )
                (i32.const 63)
               )
               (i32.const 128)
              )
             )
             (local.set $12
              (i32.or
               (i32.and
                (local.get $7)
                (i32.const 63)
               )
               (i32.const 128)
              )
             )
             (i32.store
              (local.get $5)
              (i32.or
               (i32.or
                (i32.or
                 (i32.shl
                  (local.get $12)
                  (i32.const 24)
                 )
                 (i32.shl
                  (local.get $11)
                  (i32.const 16)
                 )
                )
                (i32.shl
                 (local.get $10)
                 (i32.const 8)
                )
               )
               (local.get $8)
              )
             )
             (local.set $5
              (i32.add
               (local.get $5)
               (i32.const 4)
              )
             )
             (local.set $0
              (i32.add
               (local.get $0)
               (i32.const 4)
              )
             )
             (br $while-continue|0)
             (unreachable)
            )
           )
          )
         )
         (local.set $9
          (i32.or
           (i32.shr_u
            (local.get $7)
            (i32.const 12)
           )
           (i32.const 224)
          )
         )
         (local.set $12
          (i32.or
           (i32.and
            (i32.shr_u
             (local.get $7)
             (i32.const 6)
            )
            (i32.const 63)
           )
           (i32.const 128)
          )
         )
         (local.set $11
          (i32.or
           (i32.and
            (local.get $7)
            (i32.const 63)
           )
           (i32.const 128)
          )
         )
         (i32.store16
          (local.get $5)
          (i32.or
           (i32.shl
            (local.get $12)
            (i32.const 8)
           )
           (local.get $9)
          )
         )
         (i32.store8 offset=2
          (local.get $5)
          (local.get $11)
         )
         (local.set $5
          (i32.add
           (local.get $5)
           (i32.const 3)
          )
         )
        )
       )
      )
      (local.set $0
       (i32.add
        (local.get $0)
        (i32.const 2)
       )
      )
      (br $while-continue|0)
     )
    )
   )
  )
  (if
   (local.get $3)
   (i32.store8
    (block (result i32)
     (local.set $5
      (i32.add
       (local.tee $6
        (local.get $5)
       )
       (i32.const 1)
      )
     )
     (local.get $6)
    )
    (i32.const 0)
   )
  )
  (i32.sub
   (local.get $5)
   (local.get $2)
  )
 )
 (func $~lib/string/String.UTF8.encode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (call $~lib/rt/pure/__new
    (call $~lib/string/String.UTF8.byteLength
     (local.get $0)
     (local.get $1)
    )
    (i32.const 0)
   )
  )
  (drop
   (call $~lib/string/String.UTF8.encodeUnsafe
    (local.get $0)
    (call $~lib/string/String#get:length
     (local.get $0)
    )
    (local.get $2)
    (local.get $1)
   )
  )
  (local.set $3
   (call $~lib/rt/pure/__retain
    (local.get $2)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $3)
 )
 (func $assembly/primitives/writebuffer/WriteBuffer#get:buffer (param $0 i32) (result i32)
  (call $~lib/rt/pure/__retain
   (i32.load
    (i32.load
     (local.get $0)
    )
   )
  )
 )
 (func $assembly/primitives/writebuffer/WriteBuffer#get:size (param $0 i32) (result i32)
  (call $~lib/typedarray/Uint8Array#get:length
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $assembly/utils/ArrayUtils/typedToArray@varargs (param $0 i32) (param $1 i32) (result i32)
  (block $1of1
   (block $0of1
    (block $outOfRange
     (br_table $0of1 $1of1 $outOfRange
      (i32.sub
       (global.get $~argumentsLength)
       (i32.const 1)
      )
     )
    )
    (unreachable)
   )
   (local.set $1
    (i32.const -1)
   )
  )
  (call $assembly/utils/ArrayUtils/typedToArray
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec/utils/Bytes/Bytes.copy<u8> (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (local.set $4
   (i32.const 0)
  )
  (block $for-break0
   (loop $for-loop|0
    (local.set $5
     (i32.lt_s
      (local.get $4)
      (call $~lib/array/Array<u8>#get:length
       (local.get $1)
      )
     )
    )
    (if
     (local.get $5)
     (block
      (block $for-continue|0
       (if
        (i32.le_s
         (i32.sub
          (call $~lib/array/Array<u8>#get:length
           (local.get $0)
          )
          (local.get $3)
         )
         (local.get $4)
        )
        (block
         (br $for-break0)
         (unreachable)
        )
       )
       (call $~lib/array/Array<u8>#__set
        (local.get $1)
        (i32.add
         (local.get $2)
         (local.get $4)
        )
        (call $~lib/array/Array<u8>#__get
         (local.get $0)
         (i32.add
          (local.get $3)
          (local.get $4)
         )
        )
       )
      )
      (local.set $4
       (i32.add
        (local.get $4)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 4)
       (i32.const 24)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $~lib/array/Array<u8>#constructor
      (i32.const 0)
      (i32.const 32)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (call $assembly/deps/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (local.get $1)
   (i32.load
    (local.get $0)
   )
   (i32.const 0)
   (i32.const 0)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $0)
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash#unwrap (param $0 i32) (result i32)
  (call $~lib/rt/pure/__retain
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash.bytesToHash (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $1
   (call $assembly/deps/as-scale-codec/Hash/Hash#constructor
    (i32.const 0)
    (local.tee $2
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/__newArray
       (i32.const 0)
       (i32.const 0)
       (i32.const 6)
       (i32.const 1792)
      )
     )
    )
   )
  )
  (if
   (i32.gt_s
    (call $~lib/array/Array<u8>#get:length
     (local.get $0)
    )
    (i32.const 32)
   )
   (local.set $0
    (block (result i32)
     (local.set $3
      (call $~lib/array/Array<u8>#slice
       (local.get $0)
       (i32.sub
        (call $~lib/array/Array<u8>#get:length
         (local.get $0)
        )
        (i32.const 32)
       )
       (global.get $~lib/builtins/i32.MAX_VALUE)
      )
     )
     (call $~lib/rt/pure/__release
      (local.get $0)
     )
     (local.get $3)
    )
   )
  )
  (local.set $3
   (i32.sub
    (i32.const 32)
    (call $~lib/array/Array<u8>#get:length
     (local.get $0)
    )
   )
  )
  (call $assembly/deps/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (local.get $0)
   (local.tee $4
    (call $assembly/deps/as-scale-codec/Hash/Hash#unwrap
     (local.get $1)
    )
   )
   (local.get $3)
   (i32.const 0)
  )
  (local.set $5
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $5)
 )
 (func $assembly/primitives/crypto/invoke_hash_algo (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (call $~lib/rt/pure/__retain
    (local.get $2)
   )
  )
  (local.set $3
   (call $assembly/primitives/writebuffer/WriteBuffer#constructor
    (i32.const 0)
    (local.get $0)
   )
  )
  (local.set $4
   (call $~lib/typedarray/Uint8Array#constructor
    (i32.const 0)
    (local.get $1)
   )
  )
  (call_indirect (type $i32_i32_i32_=>_none)
   (local.tee $5
    (call $assembly/primitives/writebuffer/WriteBuffer#get:buffer
     (local.get $3)
    )
   )
   (call $assembly/primitives/writebuffer/WriteBuffer#get:size
    (local.get $3)
   )
   (i32.load
    (local.get $4)
   )
   (i32.load
    (block (result i32)
     (global.set $~argumentsLength
      (i32.const 3)
     )
     (local.get $2)
    )
   )
  )
  (local.set $7
   (call $assembly/deps/as-scale-codec/Hash/Hash.bytesToHash
    (local.tee $6
     (call $assembly/utils/ArrayUtils/typedToArray@varargs
      (local.get $4)
      (block (result i32)
       (global.set $~argumentsLength
        (i32.const 1)
       )
       (i32.const 0)
      )
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $5)
  )
  (call $~lib/rt/pure/__release
   (local.get $6)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (local.get $7)
 )
 (func $assembly/primitives/crypto/Crypto.sha256s (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (call $assembly/primitives/crypto/invoke_hash_algo
    (local.tee $1
     (call $~lib/string/String.UTF8.encode
      (local.get $0)
      (i32.const 0)
     )
    )
    (i32.const 32)
    (i32.const 1760)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $2)
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash#encodedLength (param $0 i32) (result i32)
  (i32.const 32)
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash#toU8a (param $0 i32) (result i32)
  (local $1 i32)
  (local.set $1
   (call $~lib/array/Array<u8>#constructor
    (i32.const 0)
    (call $assembly/deps/as-scale-codec/Hash/Hash#encodedLength
     (local.get $0)
    )
   )
  )
  (call $assembly/deps/as-scale-codec/utils/Bytes/Bytes.copy<u8>
   (i32.load
    (local.get $0)
   )
   (local.get $1)
   (i32.const 0)
   (i32.const 0)
  )
  (local.get $1)
 )
 (func $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#hashKey (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (call $assembly/primitives/crypto/Crypto.sha256s
    (i32.load
     (local.get $0)
    )
   )
  )
  (local.set $3
   (call $~lib/rt/pure/__retain
    (i32.load
     (local.tee $2
      (call $assembly/deps/as-scale-codec/Hash/Hash#toU8a
       (local.get $1)
      )
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (local.get $3)
 )
 (func $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#store (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (local.set $3
   (call $assembly/primitives/writebuffer/WriteBuffer#constructor
    (i32.const 0)
    (i32.load
     (local.tee $2
      (call $assembly/deps/as-scale-codec/Bool/Bool#toU8a
       (local.get $1)
      )
     )
    )
   )
  )
  (call $assembly/seal/seal0/seal_set_storage
   (local.tee $4
    (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#hashKey
     (local.get $0)
    )
   )
   (local.tee $5
    (call $assembly/primitives/writebuffer/WriteBuffer#get:buffer
     (local.get $3)
    )
   )
   (call $assembly/primitives/writebuffer/WriteBuffer#get:size
    (local.get $3)
   )
  )
  (local.set $6
   (global.get $assembly/primitives/alias/ReturnCode.Success)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $5)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $6)
 )
 (func $examples/flipper/flipper/Stored#set:flag (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (local.set $3
     (call $assembly/deps/as-scale-codec/Bool/Bool#constructor
      (i32.const 0)
      (local.get $1)
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $2)
     )
    )
    (local.get $3)
   )
  )
  (local.set $2
   (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#constructor
    (i32.const 0)
    (i32.const 1632)
   )
  )
  (drop
   (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#store
    (local.get $2)
    (if (result i32)
     (local.tee $3
      (i32.load
       (local.get $0)
      )
     )
     (local.get $3)
     (block
      (call $~lib/builtins/abort
       (i32.const 1232)
       (i32.const 1680)
       (i32.const 37)
       (i32.const 17)
      )
      (unreachable)
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
 )
 (func $examples/flipper/flipper/Flipper#onDeploy (param $0 i32) (param $1 i32)
  (call $examples/flipper/flipper/Stored#set:flag
   (i32.load
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $examples/flipper/flipper/deploy (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 880)
    )
   )
  )
  (local.set $2
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 912)
    )
   )
  )
  (local.set $0
   (call $examples/flipper/flipper/Flipper#constructor
    (i32.const 0)
   )
  )
  (if
   (call $assembly/buildins/Msg/Msg#isSelector
    (global.get $examples/flipper/flipper/msg)
    (local.get $1)
   )
   (block
    (local.set $4
     (call $assembly/buildins/FnParameters/FnParameters#constructor
      (i32.const 0)
      (local.tee $3
       (call $assembly/buildins/Msg/Msg#get:data
        (global.get $examples/flipper/flipper/msg)
       )
      )
     )
    )
    (local.set $5
     (call $assembly/buildins/FnParameters/FnParameters#get<assembly/deps/as-scale-codec/Bool/Bool>
      (local.get $4)
     )
    )
    (call $examples/flipper/flipper/Flipper#onDeploy
     (local.get $0)
     (call $assembly/deps/as-scale-codec/Bool/Bool#unwrap
      (local.get $5)
     )
    )
    (call $~lib/rt/pure/__release
     (local.get $3)
    )
    (call $~lib/rt/pure/__release
     (local.get $4)
    )
    (call $~lib/rt/pure/__release
     (local.get $5)
    )
   )
   (if
    (call $assembly/buildins/Msg/Msg#isSelector
     (global.get $examples/flipper/flipper/msg)
     (local.get $2)
    )
    (call $examples/flipper/flipper/Flipper#onDeploy
     (local.get $0)
     (i32.const 0)
    )
    (nop)
   )
  )
  (local.set $5
   (i32.const 0)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $5)
 )
 (func $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#load (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local.set $2
   (call $~lib/rt/pure/__retain
    (local.tee $1
     (call $assembly/deps/as-scale-codec/Bool/Bool#constructor
      (i32.const 0)
      (i32.const 0)
     )
    )
   )
  )
  (local.set $3
   (call $assembly/deps/as-scale-codec/Bool/Bool#encodedLength
    (local.get $2)
   )
  )
  (local.set $4
   (call $assembly/primitives/readbuffer/ReadBuffer#constructor
    (i32.const 0)
    (local.get $3)
   )
  )
  (local.set $8
   (call $assembly/seal/seal0/seal_get_storage
    (local.tee $5
     (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#hashKey
      (local.get $0)
     )
    )
    (local.tee $6
     (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
      (local.get $4)
     )
    )
    (local.tee $7
     (call $assembly/primitives/readbuffer/ReadBuffer#get:sizeBuffer
      (local.get $4)
     )
    )
   )
  )
  (if
   (if (result i32)
    (i32.eq
     (local.get $8)
     (global.get $assembly/primitives/alias/ReturnCode.Success)
    )
    (i32.eq
     (call $assembly/primitives/readbuffer/ReadBuffer#get:readSize
      (local.get $4)
     )
     (local.get $3)
    )
    (i32.const 0)
   )
   (block
    (call $assembly/deps/as-scale-codec/Bool/Bool#populateFromBytes
     (local.get $2)
     (local.tee $9
      (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
       (local.get $4)
      )
     )
     (i32.const 0)
    )
    (call $~lib/rt/pure/__release
     (local.get $9)
    )
   )
  )
  (local.set $9
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $5)
  )
  (call $~lib/rt/pure/__release
   (local.get $6)
  )
  (call $~lib/rt/pure/__release
   (local.get $7)
  )
  (local.get $9)
 )
 (func $examples/flipper/flipper/Stored#get:flag (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.eq
    (i32.load
     (local.get $0)
    )
    (i32.const 0)
   )
   (block
    (local.set $1
     (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#constructor
      (i32.const 0)
      (i32.const 1632)
     )
    )
    (i32.store
     (local.tee $2
      (local.get $0)
     )
     (block (result i32)
      (local.set $3
       (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>#load
        (local.get $1)
       )
      )
      (call $~lib/rt/pure/__release
       (i32.load
        (local.get $2)
       )
      )
      (local.get $3)
     )
    )
    (call $~lib/rt/pure/__release
     (local.get $1)
    )
   )
  )
  (call $assembly/deps/as-scale-codec/Bool/Bool#unwrap
   (if (result i32)
    (local.tee $1
     (i32.load
      (local.get $0)
     )
    )
    (local.get $1)
    (block
     (call $~lib/builtins/abort
      (i32.const 1232)
      (i32.const 1680)
      (i32.const 31)
      (i32.const 12)
     )
     (unreachable)
    )
   )
  )
 )
 (func $examples/flipper/flipper/Flipper#flip (param $0 i32)
  (local $1 i32)
  (local.set $1
   (call $examples/flipper/flipper/Stored#get:flag
    (i32.load
     (local.get $0)
    )
   )
  )
  (call $examples/flipper/flipper/Stored#set:flag
   (i32.load
    (local.get $0)
   )
   (i32.eqz
    (local.get $1)
   )
  )
 )
 (func $examples/flipper/flipper/Flipper#get (param $0 i32) (result i32)
  (call $examples/flipper/flipper/Stored#get:flag
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $assembly/primitives/returndata/ReturnData.set<assembly/deps/as-scale-codec/Bool/Bool> (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (call $assembly/primitives/writebuffer/WriteBuffer#constructor
    (i32.const 0)
    (i32.load
     (local.tee $1
      (call $assembly/deps/as-scale-codec/Bool/Bool#toU8a
       (local.get $0)
      )
     )
    )
   )
  )
  (call $assembly/seal/seal0/seal_return
   (i32.const 0)
   (local.tee $3
    (call $assembly/primitives/writebuffer/WriteBuffer#get:buffer
     (local.get $2)
    )
   )
   (call $assembly/primitives/writebuffer/WriteBuffer#get:size
    (local.get $2)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
 )
 (func $examples/flipper/flipper/Flipper#pay (param $0 i32)
  (nop)
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#constructor (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 8)
       (i32.const 7)
      )
     )
    )
   )
   (i32.store
    (local.get $0)
    (i32.const 0)
   )
   (i32.store offset=4
    (local.get $0)
    (i32.const 0)
   )
  )
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (i32.store
   (local.tee $2
    (local.get $0)
   )
   (block (result i32)
    (if
     (i32.ne
      (local.tee $3
       (local.get $1)
      )
      (local.tee $4
       (i32.load
        (local.get $2)
       )
      )
     )
     (block
      (local.set $3
       (call $~lib/rt/pure/__retain
        (local.get $3)
       )
      )
      (call $~lib/rt/pure/__release
       (local.get $4)
      )
     )
    )
    (local.get $3)
   )
  )
  (i32.store offset=4
   (local.get $0)
   (i32.const 16)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (local.get $0)
 )
 (func $~lib/as-bignum/integer/u128/u128#constructor (param $0 i32) (param $1 i64) (param $2 i64) (result i32)
  (block
   (if
    (i32.eqz
     (local.get $0)
    )
    (local.set $0
     (call $~lib/rt/pure/__retain
      (call $~lib/rt/pure/__new
       (i32.const 16)
       (i32.const 8)
      )
     )
    )
   )
   (i64.store
    (local.get $0)
    (local.get $1)
   )
   (i64.store offset=8
    (local.get $0)
    (local.get $2)
   )
  )
  (local.get $0)
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#constructor@varargs (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (block $1of1
   (block $0of1
    (block $outOfRange
     (br_table $0of1 $1of1 $outOfRange
      (global.get $~argumentsLength)
     )
    )
    (unreachable)
   )
   (local.set $1
    (local.tee $2
     (block $~lib/as-bignum/integer/u128/u128.get:Zero|inlined.0 (result i32)
      (call $~lib/as-bignum/integer/u128/u128#constructor
       (i32.const 0)
       (i64.const 0)
       (i64.const 0)
      )
     )
    )
   )
  )
  (local.set $3
   (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#constructor
    (local.get $0)
    (local.get $1)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (local.get $3)
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#encodedLength (param $0 i32) (result i32)
  (i32.load offset=4
   (local.get $0)
  )
 )
 (func $~lib/polyfills/bswap<u64> (param $0 i64) (result i64)
  (local $1 i64)
  (local $2 i64)
  (local $3 i64)
  (drop
   (i32.const 1)
  )
  (block
   (drop
    (i32.eq
     (i32.const 8)
     (i32.const 2)
    )
   )
   (drop
    (i32.eq
     (i32.const 8)
     (i32.const 4)
    )
   )
   (drop
    (i32.eq
     (i32.const 8)
     (i32.const 8)
    )
   )
   (block
    (local.set $1
     (i64.and
      (i64.shr_u
       (local.get $0)
       (i64.const 8)
      )
      (i64.const 71777214294589695)
     )
    )
    (local.set $2
     (i64.shl
      (i64.and
       (local.get $0)
       (i64.const 71777214294589695)
      )
      (i64.const 8)
     )
    )
    (local.set $3
     (i64.or
      (local.get $1)
      (local.get $2)
     )
    )
    (local.set $1
     (i64.and
      (i64.shr_u
       (local.get $3)
       (i64.const 16)
      )
      (i64.const 281470681808895)
     )
    )
    (local.set $2
     (i64.shl
      (i64.and
       (local.get $3)
       (i64.const 281470681808895)
      )
      (i64.const 16)
     )
    )
    (return
     (i64.rotr
      (i64.or
       (local.get $1)
       (local.get $2)
      )
      (i64.const 32)
     )
    )
   )
  )
 )
 (func $~lib/as-bignum/integer/u128/u128.fromBytesBE (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (if
   (i32.eqz
    (if (result i32)
     (call $~lib/array/Array<u8>#get:length
      (local.get $0)
     )
     (i32.eq
      (i32.and
       (call $~lib/array/Array<u8>#get:length
        (local.get $0)
       )
       (i32.const 15)
      )
      (i32.const 0)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 2192)
     (i32.const 130)
     (i32.const 5)
    )
    (unreachable)
   )
  )
  (local.set $1
   (i32.load offset=4
    (local.get $0)
   )
  )
  (local.set $2
   (call $~lib/as-bignum/integer/u128/u128#constructor
    (i32.const 0)
    (call $~lib/polyfills/bswap<u64>
     (i64.load offset=8
      (local.get $1)
     )
    )
    (call $~lib/polyfills/bswap<u64>
     (i64.load
      (local.get $1)
     )
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $2)
 )
 (func $~lib/as-bignum/integer/u128/u128.fromBytesLE (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (if
   (i32.eqz
    (if (result i32)
     (call $~lib/array/Array<u8>#get:length
      (local.get $0)
     )
     (i32.eq
      (i32.and
       (call $~lib/array/Array<u8>#get:length
        (local.get $0)
       )
       (i32.const 15)
      )
      (i32.const 0)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 2192)
     (i32.const 120)
     (i32.const 5)
    )
    (unreachable)
   )
  )
  (local.set $1
   (i32.load offset=4
    (local.get $0)
   )
  )
  (local.set $2
   (call $~lib/as-bignum/integer/u128/u128#constructor
    (i32.const 0)
    (i64.load
     (local.get $1)
    )
    (i64.load offset=8
     (local.get $1)
    )
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $2)
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#populateFromBytes (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local.set $1
   (call $~lib/rt/pure/__retain
    (local.get $1)
   )
  )
  (if
   (i32.eqz
    (i32.eq
     (call $~lib/array/Array<u8>#get:length
      (local.get $1)
     )
     (i32.const 16)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 1984)
     (i32.const 2080)
     (i32.const 46)
     (i32.const 7)
    )
    (unreachable)
   )
  )
  (i32.store
   (local.tee $7
    (local.get $0)
   )
   (block (result i32)
    (local.set $6
     (block $~lib/as-bignum/integer/u128/u128.from<~lib/array/Array<u8>>|inlined.0 (result i32)
      (local.set $3
       (call $~lib/rt/pure/__retain
        (local.get $1)
       )
      )
      (drop
       (i32.const 0)
      )
      (block
       (drop
        (i32.const 0)
       )
       (block
        (drop
         (i32.const 0)
        )
        (block
         (drop
          (i32.const 0)
         )
         (block
          (drop
           (i32.const 0)
          )
          (block
           (drop
            (i32.const 0)
           )
           (block
            (drop
             (i32.const 0)
            )
            (block
             (drop
              (i32.const 0)
             )
             (block
              (drop
               (i32.const 0)
              )
              (block
               (drop
                (i32.const 0)
               )
               (block
                (drop
                 (i32.const 0)
                )
                (block
                 (drop
                  (i32.const 0)
                 )
                 (block
                  (drop
                   (i32.const 0)
                  )
                  (block
                   (drop
                    (i32.const 0)
                   )
                   (block
                    (drop
                     (i32.const 0)
                    )
                    (block
                     (drop
                      (i32.const 1)
                     )
                     (block
                      (local.set $5
                       (block $~lib/as-bignum/integer/u128/u128.fromBytes<~lib/array/Array<u8>>|inlined.0 (result i32)
                        (local.set $4
                         (call $~lib/rt/pure/__retain
                          (local.get $3)
                         )
                        )
                        (local.set $5
                         (i32.const 0)
                        )
                        (drop
                         (i32.const 1)
                        )
                        (block
                         (local.set $6
                          (if (result i32)
                           (local.get $5)
                           (call $~lib/as-bignum/integer/u128/u128.fromBytesBE
                            (local.get $4)
                           )
                           (call $~lib/as-bignum/integer/u128/u128.fromBytesLE
                            (local.get $4)
                           )
                          )
                         )
                         (call $~lib/rt/pure/__release
                          (local.get $4)
                         )
                         (br $~lib/as-bignum/integer/u128/u128.fromBytes<~lib/array/Array<u8>>|inlined.0
                          (local.get $6)
                         )
                        )
                       )
                      )
                      (call $~lib/rt/pure/__release
                       (local.get $3)
                      )
                      (br $~lib/as-bignum/integer/u128/u128.from<~lib/array/Array<u8>>|inlined.0
                       (local.get $5)
                      )
                     )
                    )
                   )
                  )
                 )
                )
               )
              )
             )
            )
           )
          )
         )
        )
       )
      )
     )
    )
    (call $~lib/rt/pure/__release
     (i32.load
      (local.get $7)
     )
    )
    (local.get $6)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
 )
 (func $assembly/primitives/readbuffer/ReadBuffer.readInstance<assembly/deps/as-scale-codec//UInt/UInt128/UInt128> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local.set $0
   (call $~lib/rt/pure/__retain
    (local.get $0)
   )
  )
  (local.set $2
   (call $~lib/rt/pure/__retain
    (local.tee $1
     (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#constructor@varargs
      (i32.const 0)
      (block (result i32)
       (global.set $~argumentsLength
        (i32.const 0)
       )
       (i32.const 0)
      )
     )
    )
   )
  )
  (local.set $3
   (call $assembly/primitives/readbuffer/ReadBuffer#constructor
    (i32.const 0)
    (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#encodedLength
     (local.get $2)
    )
   )
  )
  (call_indirect (type $i32_i32_=>_none)
   (local.tee $4
    (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
     (local.get $3)
    )
   )
   (local.tee $5
    (call $assembly/primitives/readbuffer/ReadBuffer#get:sizeBuffer
     (local.get $3)
    )
   )
   (i32.load
    (block (result i32)
     (global.set $~argumentsLength
      (i32.const 2)
     )
     (local.get $0)
    )
   )
  )
  (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#populateFromBytes
   (local.get $2)
   (local.tee $6
    (call $assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
     (local.get $3)
    )
   )
   (i32.const 0)
  )
  (local.set $7
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $5)
  )
  (call $~lib/rt/pure/__release
   (local.get $6)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (local.get $7)
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#unwrap (param $0 i32) (result i32)
  (call $~lib/rt/pure/__retain
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $assembly/buildins/Msg/Msg#get:value (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.eq
    (i32.load offset=4
     (local.get $0)
    )
    (i32.const 0)
   )
   (i32.store offset=4
    (local.tee $1
     (local.get $0)
    )
    (block (result i32)
     (local.set $2
      (call $assembly/primitives/readbuffer/ReadBuffer.readInstance<assembly/deps/as-scale-codec//UInt/UInt128/UInt128>
       (i32.const 1952)
      )
     )
     (call $~lib/rt/pure/__release
      (i32.load offset=4
       (local.get $1)
      )
     )
     (local.get $2)
    )
   )
  )
  (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128#unwrap
   (if (result i32)
    (local.tee $1
     (i32.load offset=4
      (local.get $0)
     )
    )
    (local.get $1)
    (block
     (call $~lib/builtins/abort
      (i32.const 1232)
      (i32.const 1296)
      (i32.const 28)
      (i32.const 12)
     )
     (unreachable)
    )
   )
  )
 )
 (func $assembly/buildins/Msg/Msg#notPayable (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local.set $4
   (block $~lib/as-bignum/integer/u128/u128.eq|inlined.0 (result i32)
    (local.set $4
     (call $~lib/rt/pure/__retain
      (local.tee $1
       (call $assembly/buildins/Msg/Msg#get:value
        (local.get $0)
       )
      )
     )
    )
    (local.set $3
     (call $~lib/rt/pure/__retain
      (local.tee $2
       (block $~lib/as-bignum/integer/u128/u128.get:Zero|inlined.1 (result i32)
        (call $~lib/as-bignum/integer/u128/u128#constructor
         (i32.const 0)
         (i64.const 0)
         (i64.const 0)
        )
       )
      )
     )
    )
    (local.set $5
     (if (result i32)
      (i64.eq
       (i64.load offset=8
        (local.get $4)
       )
       (i64.load offset=8
        (local.get $3)
       )
      )
      (i64.eq
       (i64.load
        (local.get $4)
       )
       (i64.load
        (local.get $3)
       )
      )
      (i32.const 0)
     )
    )
    (call $~lib/rt/pure/__release
     (local.get $3)
    )
    (call $~lib/rt/pure/__release
     (local.get $4)
    )
    (local.get $5)
   )
  )
  (call $~lib/rt/pure/__release
   (local.get $1)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (local.get $4)
 )
 (func $examples/flipper/flipper/Flipper#specific (param $0 i32)
  (if
   (i32.eqz
    (i32.ne
     (call $assembly/buildins/Msg/Msg#notPayable
      (global.get $examples/flipper/flipper/msg)
     )
     (i32.const 0)
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 2272)
     (i32.const 1680)
     (i32.const 65)
     (i32.const 5)
    )
    (unreachable)
   )
  )
 )
 (func $examples/flipper/flipper/call (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local.set $0
   (call $examples/flipper/flipper/Flipper#constructor
    (i32.const 0)
   )
  )
  (local.set $2
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 1824)
    )
   )
  )
  (local.set $3
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 1856)
    )
   )
  )
  (local.set $4
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 1888)
    )
   )
  )
  (local.set $5
   (call $~lib/rt/pure/__retain
    (call $~lib/rt/__newArray
     (i32.const 4)
     (i32.const 0)
     (i32.const 6)
     (i32.const 1920)
    )
   )
  )
  (if
   (call $assembly/buildins/Msg/Msg#isSelector
    (global.get $examples/flipper/flipper/msg)
    (local.get $2)
   )
   (call $examples/flipper/flipper/Flipper#flip
    (local.get $0)
   )
   (if
    (call $assembly/buildins/Msg/Msg#isSelector
     (global.get $examples/flipper/flipper/msg)
     (local.get $3)
    )
    (block
     (local.set $1
      (call $examples/flipper/flipper/Flipper#get
       (local.get $0)
      )
     )
     (call $assembly/primitives/returndata/ReturnData.set<assembly/deps/as-scale-codec/Bool/Bool>
      (local.tee $6
       (call $assembly/deps/as-scale-codec/Bool/Bool#constructor
        (i32.const 0)
        (local.get $1)
       )
      )
     )
     (call $~lib/rt/pure/__release
      (local.get $6)
     )
    )
    (if
     (call $assembly/buildins/Msg/Msg#isSelector
      (global.get $examples/flipper/flipper/msg)
      (local.get $5)
     )
     (call $examples/flipper/flipper/Flipper#pay
      (local.get $0)
     )
     (if
      (call $assembly/buildins/Msg/Msg#isSelector
       (global.get $examples/flipper/flipper/msg)
       (local.get $4)
      )
      (call $examples/flipper/flipper/Flipper#specific
       (local.get $0)
      )
      (if
       (call $assembly/buildins/Msg/Msg#notPayable
        (global.get $examples/flipper/flipper/msg)
       )
       (nop)
       (nop)
      )
     )
    )
   )
  )
  (local.set $6
   (i32.const 0)
  )
  (call $~lib/rt/pure/__release
   (local.get $0)
  )
  (call $~lib/rt/pure/__release
   (local.get $2)
  )
  (call $~lib/rt/pure/__release
   (local.get $3)
  )
  (call $~lib/rt/pure/__release
   (local.get $4)
  )
  (call $~lib/rt/pure/__release
   (local.get $5)
  )
  (local.get $6)
 )
 (func $~start
  (call $start:examples/flipper/flipper)
 )
 (func $~lib/rt/pure/finalize (param $0 i32)
  (drop
   (i32.const 0)
  )
  (call $~lib/rt/tlsf/freeBlock
   (global.get $~lib/rt/tlsf/ROOT)
   (local.get $0)
  )
 )
 (func $~lib/rt/pure/decrement (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local.set $1
   (i32.load offset=4
    (local.get $0)
   )
  )
  (local.set $2
   (i32.and
    (local.get $1)
    (i32.const 268435455)
   )
  )
  (drop
   (i32.const 0)
  )
  (drop
   (i32.const 1)
  )
  (if
   (i32.eqz
    (i32.eqz
     (i32.and
      (i32.load
       (local.get $0)
      )
      (i32.const 1)
     )
    )
   )
   (block
    (call $~lib/builtins/abort
     (i32.const 0)
     (i32.const 96)
     (i32.const 122)
     (i32.const 14)
    )
    (unreachable)
   )
  )
  (if
   (i32.eq
    (local.get $2)
    (i32.const 1)
   )
   (block
    (call $~lib/rt/__visit_members
     (i32.add
      (local.get $0)
      (i32.const 20)
     )
     (i32.const 1)
    )
    (drop
     (i32.const 1)
    )
    (block
     (drop
      (i32.const 1)
     )
     (if
      (i32.eqz
       (i32.eqz
        (i32.and
         (local.get $1)
         (i32.const -2147483648)
        )
       )
      )
      (block
       (call $~lib/builtins/abort
        (i32.const 0)
        (i32.const 96)
        (i32.const 126)
        (i32.const 18)
       )
       (unreachable)
      )
     )
     (call $~lib/rt/pure/finalize
      (local.get $0)
     )
    )
   )
   (block
    (drop
     (i32.const 1)
    )
    (if
     (i32.eqz
      (i32.gt_u
       (local.get $2)
       (i32.const 0)
      )
     )
     (block
      (call $~lib/builtins/abort
       (i32.const 0)
       (i32.const 96)
       (i32.const 136)
       (i32.const 16)
      )
      (unreachable)
     )
    )
    (drop
     (i32.const 1)
    )
    (i32.store offset=4
     (local.get $0)
     (i32.or
      (i32.and
       (local.get $1)
       (i32.xor
        (i32.const 268435455)
        (i32.const -1)
       )
      )
      (i32.sub
       (local.get $2)
       (i32.const 1)
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/pure/__visit (param $0 i32) (param $1 i32)
  (if
   (i32.lt_u
    (local.get $0)
    (global.get $~lib/memory/__heap_base)
   )
   (block
    (return)
    (unreachable)
   )
  )
  (drop
   (i32.const 1)
  )
  (block
   (drop
    (i32.const 1)
   )
   (if
    (i32.eqz
     (i32.eq
      (local.get $1)
      (i32.const 1)
     )
    )
    (block
     (call $~lib/builtins/abort
      (i32.const 0)
      (i32.const 96)
      (i32.const 69)
      (i32.const 16)
     )
     (unreachable)
    )
   )
   (call $~lib/rt/pure/decrement
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
  )
 )
 (func $~lib/arraybuffer/ArrayBuffer~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/string/String~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/arraybuffer/ArrayBufferView~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $~lib/array/Array<~lib/string/String>#__visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (drop
   (i32.const 1)
  )
  (block
   (local.set $2
    (i32.load offset=4
     (local.get $0)
    )
   )
   (local.set $3
    (i32.add
     (local.get $2)
     (i32.shl
      (i32.load offset=12
       (local.get $0)
      )
      (i32.const 2)
     )
    )
   )
   (block $while-break|0
    (loop $while-continue|0
     (local.set $4
      (i32.lt_u
       (local.get $2)
       (local.get $3)
      )
     )
     (if
      (local.get $4)
      (block
       (local.set $5
        (i32.load
         (local.get $2)
        )
       )
       (if
        (local.get $5)
        (call $~lib/rt/pure/__visit
         (local.get $5)
         (local.get $1)
        )
       )
       (local.set $2
        (i32.add
         (local.get $2)
         (i32.const 4)
        )
       )
       (br $while-continue|0)
      )
     )
    )
   )
  )
  (call $~lib/rt/pure/__visit
   (i32.load
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $~lib/array/Array<~lib/string/String>~visit (param $0 i32) (param $1 i32)
  (call $~lib/array/Array<~lib/string/String>#__visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/utils/Log/Logger~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $assembly/buildins/Msg/Msg~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
  (if
   (local.tee $2
    (i32.load offset=4
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
  (if
   (local.tee $2
    (i32.load offset=8
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
  (if
   (local.tee $2
    (i32.load offset=12
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $~lib/array/Array<u8>#__visit (param $0 i32) (param $1 i32)
  (drop
   (i32.const 0)
  )
  (call $~lib/rt/pure/__visit
   (i32.load
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $~lib/array/Array<u8>~visit (param $0 i32) (param $1 i32)
  (call $~lib/array/Array<u8>#__visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec//UInt/UInt128/UInt128~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $~lib/as-bignum/integer/u128/u128~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $assembly/deps/as-scale-codec//interfaces/UnwrappableCodec/UnwrappableCodec<~lib/as-bignum/integer/u128/u128>~visit (param $0 i32) (param $1 i32)
  (call $assembly/deps/as-scale-codec//interfaces/Codec/Codec~visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec//interfaces/Codec/Codec~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/array/Array<i32>#__visit (param $0 i32) (param $1 i32)
  (drop
   (i32.const 0)
  )
  (call $~lib/rt/pure/__visit
   (i32.load
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $~lib/array/Array<i32>~visit (param $0 i32) (param $1 i32)
  (call $~lib/array/Array<i32>#__visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $examples/flipper/flipper/Flipper~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $examples/flipper/flipper/Stored~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/deps/as-scale-codec/Bool/Bool~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<bool>~visit (param $0 i32) (param $1 i32)
  (call $assembly/deps/as-scale-codec/interfaces/Codec/Codec~visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/deps/as-scale-codec/interfaces/Codec/Codec~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $assembly/primitives/inputdata/MessageInputReader~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/primitives/readbuffer/ReadBuffer~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
  (if
   (local.tee $2
    (i32.load offset=4
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $~lib/typedarray/Uint8Array~visit (param $0 i32) (param $1 i32)
  (call $~lib/arraybuffer/ArrayBufferView~visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $assembly/primitives/sizebuffer/SizeBuffer~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/buildins/FnParameters/FnParameters~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load offset=4
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/primitives/writebuffer/WriteBuffer~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/deps/as-scale-codec/Hash/Hash~visit (param $0 i32) (param $1 i32)
  (local $2 i32)
  (if
   (local.tee $2
    (i32.load
     (local.get $0)
    )
   )
   (call $~lib/rt/pure/__visit
    (local.get $2)
    (local.get $1)
   )
  )
 )
 (func $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<~lib/array/Array<u8>>~visit (param $0 i32) (param $1 i32)
  (call $assembly/deps/as-scale-codec/interfaces/Codec/Codec~visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void>#__visit (param $0 i32) (param $1 i32)
  (call $~lib/rt/pure/__visit
   (i32.load offset=4
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void>~visit (param $0 i32) (param $1 i32)
  (call $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void>#__visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void>#__visit (param $0 i32) (param $1 i32)
  (call $~lib/rt/pure/__visit
   (i32.load offset=4
    (local.get $0)
   )
   (local.get $1)
  )
 )
 (func $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void>~visit (param $0 i32) (param $1 i32)
  (call $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void>#__visit
   (local.get $0)
   (local.get $1)
  )
 )
 (func $~lib/as-bignum/integer/i128/i128~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/as-bignum/integer/i256/i256~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/as-bignum/integer/u256/u256~visit (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $~lib/rt/__visit_members (param $0 i32) (param $1 i32)
  (block $invalid
   (block $~lib/as-bignum/integer/u256/u256
    (block $~lib/as-bignum/integer/i256/i256
     (block $~lib/as-bignum/integer/i128/i128
      (block $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void>
       (block $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void>
        (block $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<~lib/array/Array<u8>>
         (block $assembly/deps/as-scale-codec/Hash/Hash
          (block $assembly/primitives/writebuffer/WriteBuffer
           (block $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>
            (block $assembly/buildins/FnParameters/FnParameters
             (block $assembly/primitives/sizebuffer/SizeBuffer
              (block $~lib/typedarray/Uint8Array
               (block $assembly/primitives/readbuffer/ReadBuffer
                (block $assembly/primitives/inputdata/MessageInputReader
                 (block $assembly/deps/as-scale-codec/interfaces/Codec/Codec
                  (block $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<bool>
                   (block $assembly/deps/as-scale-codec/Bool/Bool
                    (block $examples/flipper/flipper/Stored
                     (block $examples/flipper/flipper/Flipper
                      (block $~lib/array/Array<i32>
                       (block $assembly/deps/as-scale-codec//interfaces/Codec/Codec
                        (block $assembly/deps/as-scale-codec//interfaces/UnwrappableCodec/UnwrappableCodec<~lib/as-bignum/integer/u128/u128>
                         (block $~lib/as-bignum/integer/u128/u128
                          (block $assembly/deps/as-scale-codec//UInt/UInt128/UInt128
                           (block $~lib/array/Array<u8>
                            (block $assembly/buildins/Msg/Msg
                             (block $assembly/utils/Log/Logger
                              (block $~lib/array/Array<~lib/string/String>
                               (block $~lib/arraybuffer/ArrayBufferView
                                (block $~lib/string/String
                                 (block $~lib/arraybuffer/ArrayBuffer
                                  (br_table $~lib/arraybuffer/ArrayBuffer $~lib/string/String $~lib/arraybuffer/ArrayBufferView $~lib/array/Array<~lib/string/String> $assembly/utils/Log/Logger $assembly/buildins/Msg/Msg $~lib/array/Array<u8> $assembly/deps/as-scale-codec//UInt/UInt128/UInt128 $~lib/as-bignum/integer/u128/u128 $assembly/deps/as-scale-codec//interfaces/UnwrappableCodec/UnwrappableCodec<~lib/as-bignum/integer/u128/u128> $assembly/deps/as-scale-codec//interfaces/Codec/Codec $~lib/array/Array<i32> $examples/flipper/flipper/Flipper $examples/flipper/flipper/Stored $assembly/deps/as-scale-codec/Bool/Bool $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<bool> $assembly/deps/as-scale-codec/interfaces/Codec/Codec $assembly/primitives/inputdata/MessageInputReader $assembly/primitives/readbuffer/ReadBuffer $~lib/typedarray/Uint8Array $assembly/primitives/sizebuffer/SizeBuffer $assembly/buildins/FnParameters/FnParameters $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool> $assembly/primitives/writebuffer/WriteBuffer $assembly/deps/as-scale-codec/Hash/Hash $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<~lib/array/Array<u8>> $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void> $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void> $~lib/as-bignum/integer/i128/i128 $~lib/as-bignum/integer/i256/i256 $~lib/as-bignum/integer/u256/u256 $invalid
                                   (i32.load
                                    (i32.sub
                                     (local.get $0)
                                     (i32.const 8)
                                    )
                                   )
                                  )
                                 )
                                 (block
                                  (call $~lib/arraybuffer/ArrayBuffer~visit
                                   (local.get $0)
                                   (local.get $1)
                                  )
                                  (return)
                                 )
                                )
                                (block
                                 (call $~lib/string/String~visit
                                  (local.get $0)
                                  (local.get $1)
                                 )
                                 (return)
                                )
                               )
                               (block
                                (call $~lib/arraybuffer/ArrayBufferView~visit
                                 (local.get $0)
                                 (local.get $1)
                                )
                                (return)
                               )
                              )
                              (block
                               (call $~lib/array/Array<~lib/string/String>~visit
                                (local.get $0)
                                (local.get $1)
                               )
                               (return)
                              )
                             )
                             (block
                              (call $assembly/utils/Log/Logger~visit
                               (local.get $0)
                               (local.get $1)
                              )
                              (return)
                             )
                            )
                            (block
                             (call $assembly/buildins/Msg/Msg~visit
                              (local.get $0)
                              (local.get $1)
                             )
                             (return)
                            )
                           )
                           (block
                            (call $~lib/array/Array<u8>~visit
                             (local.get $0)
                             (local.get $1)
                            )
                            (return)
                           )
                          )
                          (block
                           (call $assembly/deps/as-scale-codec//UInt/UInt128/UInt128~visit
                            (local.get $0)
                            (local.get $1)
                           )
                           (return)
                          )
                         )
                         (block
                          (call $~lib/as-bignum/integer/u128/u128~visit
                           (local.get $0)
                           (local.get $1)
                          )
                          (return)
                         )
                        )
                        (block
                         (call $assembly/deps/as-scale-codec//interfaces/UnwrappableCodec/UnwrappableCodec<~lib/as-bignum/integer/u128/u128>~visit
                          (local.get $0)
                          (local.get $1)
                         )
                         (return)
                        )
                       )
                       (block
                        (call $assembly/deps/as-scale-codec//interfaces/Codec/Codec~visit
                         (local.get $0)
                         (local.get $1)
                        )
                        (return)
                       )
                      )
                      (block
                       (call $~lib/array/Array<i32>~visit
                        (local.get $0)
                        (local.get $1)
                       )
                       (return)
                      )
                     )
                     (block
                      (call $examples/flipper/flipper/Flipper~visit
                       (local.get $0)
                       (local.get $1)
                      )
                      (return)
                     )
                    )
                    (block
                     (call $examples/flipper/flipper/Stored~visit
                      (local.get $0)
                      (local.get $1)
                     )
                     (return)
                    )
                   )
                   (block
                    (call $assembly/deps/as-scale-codec/Bool/Bool~visit
                     (local.get $0)
                     (local.get $1)
                    )
                    (return)
                   )
                  )
                  (block
                   (call $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<bool>~visit
                    (local.get $0)
                    (local.get $1)
                   )
                   (return)
                  )
                 )
                 (block
                  (call $assembly/deps/as-scale-codec/interfaces/Codec/Codec~visit
                   (local.get $0)
                   (local.get $1)
                  )
                  (return)
                 )
                )
                (block
                 (call $assembly/primitives/inputdata/MessageInputReader~visit
                  (local.get $0)
                  (local.get $1)
                 )
                 (return)
                )
               )
               (block
                (call $assembly/primitives/readbuffer/ReadBuffer~visit
                 (local.get $0)
                 (local.get $1)
                )
                (return)
               )
              )
              (block
               (call $~lib/typedarray/Uint8Array~visit
                (local.get $0)
                (local.get $1)
               )
               (return)
              )
             )
             (block
              (call $assembly/primitives/sizebuffer/SizeBuffer~visit
               (local.get $0)
               (local.get $1)
              )
              (return)
             )
            )
            (block
             (call $assembly/buildins/FnParameters/FnParameters~visit
              (local.get $0)
              (local.get $1)
             )
             (return)
            )
           )
           (block
            (call $assembly/storage/storage/Storage<assembly/deps/as-scale-codec/Bool/Bool>~visit
             (local.get $0)
             (local.get $1)
            )
            (return)
           )
          )
          (block
           (call $assembly/primitives/writebuffer/WriteBuffer~visit
            (local.get $0)
            (local.get $1)
           )
           (return)
          )
         )
         (block
          (call $assembly/deps/as-scale-codec/Hash/Hash~visit
           (local.get $0)
           (local.get $1)
          )
          (return)
         )
        )
        (block
         (call $assembly/deps/as-scale-codec/interfaces/UnwrappableCodec/UnwrappableCodec<~lib/array/Array<u8>>~visit
          (local.get $0)
          (local.get $1)
         )
         (return)
        )
       )
       (block
        (call $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2Cu32%2C~lib/arraybuffer/ArrayBuffer%29=>void>~visit
         (local.get $0)
         (local.get $1)
        )
        (return)
       )
      )
      (block
       (call $~lib/function/Function<%28~lib/arraybuffer/ArrayBuffer%2C~lib/arraybuffer/ArrayBuffer%29=>void>~visit
        (local.get $0)
        (local.get $1)
       )
       (return)
      )
     )
     (block
      (call $~lib/as-bignum/integer/i128/i128~visit
       (local.get $0)
       (local.get $1)
      )
      (return)
     )
    )
    (block
     (call $~lib/as-bignum/integer/i256/i256~visit
      (local.get $0)
      (local.get $1)
     )
     (return)
    )
   )
   (block
    (call $~lib/as-bignum/integer/u256/u256~visit
     (local.get $0)
     (local.get $1)
    )
    (return)
   )
  )
  (unreachable)
 )
)
